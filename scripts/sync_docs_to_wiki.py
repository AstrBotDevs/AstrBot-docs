from __future__ import annotations

import argparse
import re
import posixpath
from pathlib import Path, PurePosixPath


MARKDOWN_LINK_RE = re.compile(r"(!?\[[^\]]*\]\()([^)]+)(\))")
TITLE_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)
MANAGED_FILENAMES = {"Home.md", "Home-en.md", "_Sidebar.md"}
MANIFEST_NAME = ".astrbot-wiki-sync-manifest"
SOURCE_ALIASES = {
    "zh/config/providers/start.md": "zh/providers/start.md",
    "en/config/providers/start.md": "en/providers/start.md",
}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def discover_source_pages(source_root: str) -> tuple[str, ...]:
    root = Path(source_root)
    pages = []
    for language in ("zh", "en"):
        language_root = root / language
        if not language_root.exists():
            continue
        for path in language_root.rglob("*.md"):
            pages.append(path.relative_to(root).as_posix())
    return tuple(sorted(pages))


def split_anchor(target: str) -> tuple[str, str]:
    if "#" not in target:
        return target, ""
    base, anchor = target.split("#", 1)
    return base, f"#{anchor}"


def ensure_markdown_suffix(path: PurePosixPath) -> PurePosixPath:
    if path.suffix:
        return path
    return path.with_suffix(".md")


def normalize_posix_path(path: PurePosixPath) -> PurePosixPath:
    normalized = posixpath.normpath(path.as_posix())
    return PurePosixPath(normalized)


def language_for_source(source_path: str) -> str:
    return PurePosixPath(source_path).parts[0]


def is_external_target(target: str) -> bool:
    return target.startswith(("http://", "https://", "mailto:", "#"))


def is_doc_target(target: str) -> bool:
    if is_external_target(target):
        return False

    base_target, _ = split_anchor(target)
    if not base_target:
        return False

    suffix = PurePosixPath(base_target).suffix.lower()
    if not suffix:
        return True
    return suffix == ".md"


def apply_source_alias(candidate: PurePosixPath) -> PurePosixPath:
    candidate_text = candidate.as_posix()
    aliased = SOURCE_ALIASES.get(candidate_text, candidate_text)
    return PurePosixPath(aliased)


def resolve_absolute_target(base_target: str, source_path: str) -> PurePosixPath:
    source_language = language_for_source(source_path)
    target = base_target.lstrip("/")
    if not target:
        return PurePosixPath(source_language) / "index.md"
    if target in {"en", "en/"}:
        return PurePosixPath("en") / "index.md"
    if target in {"zh", "zh/"}:
        return PurePosixPath("zh") / "index.md"
    if target.startswith("en/"):
        return apply_source_alias(
            normalize_posix_path(ensure_markdown_suffix(PurePosixPath(target))),
        )
    if target.startswith("zh/"):
        return apply_source_alias(
            normalize_posix_path(ensure_markdown_suffix(PurePosixPath(target))),
        )
    language_root = source_language if source_language == "en" else "zh"
    return apply_source_alias(
        normalize_posix_path(ensure_markdown_suffix(PurePosixPath(language_root) / target)),
    )


def resolve_relative_target(base_target: str, source_path: str) -> PurePosixPath:
    source = PurePosixPath(source_path)
    return apply_source_alias(
        normalize_posix_path(ensure_markdown_suffix(source.parent / PurePosixPath(base_target))),
    )


def find_existing_source_path(
    candidate: PurePosixPath,
    source_root: Path,
    source_pages: tuple[str, ...],
) -> str | None:
    candidate_text = candidate.as_posix()
    if (source_root / candidate_text).exists():
        return candidate_text

    language = candidate.parts[0] if candidate.parts else ""
    suffix = PurePosixPath(*candidate.parts[1:]).as_posix() if len(candidate.parts) > 1 else ""
    if not suffix:
        return None

    matches = [
        page
        for page in source_pages
        if page.startswith(f"{language}/") and page.endswith(suffix)
    ]
    if len(matches) == 1:
        return matches[0]
    return None


def resolve_source_path(target: str, source_path: str, source_root: Path | None = None) -> str | None:
    if not is_doc_target(target):
        return None

    root = source_root or repo_root()
    pages = discover_source_pages(str(root))
    base_target, _ = split_anchor(target)

    if base_target.startswith("/"):
        candidate = resolve_absolute_target(base_target, source_path)
    else:
        candidate = resolve_relative_target(base_target, source_path)

    return find_existing_source_path(candidate, root, pages)


def rewrite_link_target(target: str, source_path: str, source_root: Path | None = None) -> str:
    if not is_doc_target(target):
        return target

    base_target, anchor = split_anchor(target)
    resolved = resolve_source_path(base_target, source_path, source_root=source_root)
    if resolved is None:
        return target

    return f"{page_name_for_source(resolved)}{anchor}"


def rewrite_links(content: str, source_path: str, source_root: Path | None = None) -> str:
    def replace(match: re.Match[str]) -> str:
        prefix, target, suffix = match.groups()
        return f"{prefix}{rewrite_link_target(target, source_path, source_root=source_root)}{suffix}"

    return MARKDOWN_LINK_RE.sub(replace, content)


def find_unresolved_doc_links(source_root: Path) -> list[str]:
    unresolved: list[str] = []
    root = Path(source_root)

    for source_path in discover_source_pages(str(root)):
        content = (root / source_path).read_text(encoding="utf-8")
        for match in MARKDOWN_LINK_RE.finditer(content):
            target = match.group(2)
            if not is_doc_target(target):
                continue
            if resolve_source_path(target, source_path, source_root=root) is None:
                unresolved.append(f"{source_path} -> {target}")

    return unresolved


def page_name_for_source(source_path: str) -> str:
    if not source_path.endswith(".md"):
        raise ValueError(f"Unsupported source path: {source_path}")
    return source_path[:-3].replace("/", "-")


def strip_frontmatter(content: str) -> str:
    if not content.startswith("---\n"):
        return content

    closing = content.find("\n---\n", 4)
    if closing == -1:
        return content

    return content[closing + 5 :].lstrip("\n")


def normalize_content(content: str) -> str:
    stripped = content.rstrip()
    if not stripped:
        return ""
    return f"{stripped}\n"


def default_title_for_source(source_path: str) -> str:
    stem = PurePosixPath(source_path).stem
    return stem.replace("-", " ")


def extract_title(content: str, source_path: str) -> str:
    match = TITLE_RE.search(content)
    if match:
        return match.group(1).strip()
    return default_title_for_source(source_path)


def build_language_index(language: str, page_names: set[str]) -> str:
    if language == "zh":
        lines = [
            "# AstrBot 中文文档",
            "",
            "该页面由 `AstrBot-docs` 自动同步到 GitHub Wiki。",
            "",
        ]
        links = [
            ("关于 AstrBot", "zh-what-is-astrbot"),
            ("社区", "zh-community"),
            ("常见问题", "zh-faq"),
        ]
    else:
        lines = [
            "# AstrBot English Documentation",
            "",
            "This page is synchronized automatically from `AstrBot-docs` to the GitHub wiki.",
            "",
        ]
        links = [
            ("What is AstrBot", "en-what-is-astrbot"),
            ("Community", "en-community"),
            ("FAQ", "en-faq"),
        ]

    for label, page_name in links:
        if page_name in page_names:
            lines.append(f"- [{label}]({page_name})")

    return normalize_content("\n".join(lines))


def build_home_page(language: str) -> str:
    if language == "zh":
        return normalize_content(
            "\n".join(
                [
                    "# AstrBot Wiki",
                    "",
                    "该 Wiki 由 `AstrBot-docs` 自动同步生成。",
                    "",
                    "- [中文文档入口](zh-index)",
                    "- [English Docs](Home-en)",
                ],
            ),
        )

    return normalize_content(
        "\n".join(
            [
                "# AstrBot Wiki",
                "",
                "This wiki is synchronized automatically from `AstrBot-docs`.",
                "",
                "- [English docs entry](en-index)",
                "- [中文文档入口](Home)",
            ],
        ),
    )


def sidebar_group_name(group: str) -> str:
    if group == "root":
        return "Top Level"
    return group.replace("-", " ")


def build_sidebar(page_infos: list[dict[str, str | bool]]) -> str:
    lines: list[str] = []
    language_labels = {"zh": "Chinese", "en": "English"}

    for language in ("zh", "en"):
        infos = [
            info
            for info in page_infos
            if info["language"] == language and not info["is_index"]
        ]
        infos.sort(key=lambda info: str(info["source_path"]))

        lines.append(f"### {language_labels[language]}")
        lines.append("")
        lines.append(
            f"- [{'Home' if language == 'en' else '首页'}]({'Home-en' if language == 'en' else 'Home'})",
        )
        lines.append(
            f"- [{'Docs Entry' if language == 'en' else '文档入口'}]({language}-index)",
        )

        grouped: dict[str, list[dict[str, str | bool]]] = {}
        for info in infos:
            group = str(info["group"])
            grouped.setdefault(group, []).append(info)

        for group_name in sorted(grouped):
            lines.append(f"- {sidebar_group_name(group_name)}")
            for info in grouped[group_name]:
                title = str(info["title"])
                page_name = str(info["page_name"])
                lines.append(f"  - [{title}]({page_name})")

        lines.append("")

    return normalize_content("\n".join(lines))


def build_page_info(source_root: Path, source_path: str) -> dict[str, str | bool]:
    source_file = source_root / source_path
    content = source_file.read_text(encoding="utf-8")
    content = strip_frontmatter(content)
    content = rewrite_links(content, source_path=source_path, source_root=source_root)
    content = normalize_content(content)

    relative = PurePosixPath(source_path)
    parts = relative.parts
    group = "root" if len(parts) <= 2 else parts[1]

    return {
        "source_path": source_path,
        "page_name": page_name_for_source(source_path),
        "title": extract_title(content, source_path),
        "content": content,
        "language": language_for_source(source_path),
        "group": group,
        "is_index": relative.name == "index.md",
    }


def read_manifest(wiki_root: Path) -> set[str]:
    manifest_path = wiki_root / MANIFEST_NAME
    if not manifest_path.exists():
        return set()
    return {
        line.strip()
        for line in manifest_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    }


def write_manifest(wiki_root: Path, file_names: set[str]) -> None:
    manifest_path = wiki_root / MANIFEST_NAME
    content = "\n".join(sorted(file_names))
    if content:
        content = f"{content}\n"
    manifest_path.write_text(content, encoding="utf-8")


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def sync_docs_to_wiki(source_root: Path, wiki_root: Path) -> None:
    source_root = Path(source_root)
    wiki_root = Path(wiki_root)
    wiki_root.mkdir(parents=True, exist_ok=True)

    page_infos = [
        build_page_info(source_root, source_path)
        for source_path in discover_source_pages(str(source_root))
    ]
    page_names = {str(info["page_name"]) for info in page_infos}

    for info in page_infos:
        if info["is_index"] and not str(info["content"]).strip():
            generated = build_language_index(str(info["language"]), page_names)
            info["content"] = generated
            info["title"] = extract_title(generated, str(info["source_path"]))

    desired_files = {
        f"{info['page_name']}.md": str(info["content"])
        for info in page_infos
    }
    desired_files["Home.md"] = build_home_page("zh")
    desired_files["Home-en.md"] = build_home_page("en")
    desired_files["_Sidebar.md"] = build_sidebar(page_infos)

    previously_managed = read_manifest(wiki_root)
    for existing_name in previously_managed - set(desired_files):
        existing_path = wiki_root / existing_name
        if existing_path.exists():
            existing_path.unlink()

    for file_name, content in desired_files.items():
        write_file(wiki_root / file_name, content)

    write_manifest(wiki_root, set(desired_files) | MANAGED_FILENAMES)


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync AstrBot docs content to GitHub wiki pages.")
    parser.add_argument(
        "--source-root",
        default=str(repo_root()),
        help="Path to the AstrBot-docs repository root.",
    )
    parser.add_argument(
        "--wiki-root",
        required=True,
        help="Path to the checked out wiki repository.",
    )
    args = parser.parse_args()

    sync_docs_to_wiki(source_root=Path(args.source_root), wiki_root=Path(args.wiki_root))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
