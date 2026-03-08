from __future__ import annotations

import argparse
from dataclasses import dataclass
import re
import posixpath
from pathlib import Path, PurePosixPath


TITLE_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)
MANAGED_FILENAMES = {"Home.md", "Home-en.md", "_Sidebar.md"}
MANIFEST_NAME = ".astrbot-wiki-sync-manifest"
SOURCE_ALIASES = {
    "zh/config/providers/start.md": "zh/providers/start.md",
    "en/config/providers/start.md": "en/providers/start.md",
}


@dataclass
class PageInfo:
    source_path: str
    page_name: str
    title: str
    content: str
    language: str
    group: str
    is_index: bool


@dataclass
class ResolutionResult:
    resolved_path: str | None
    ambiguous_matches: tuple[str, ...] = ()


@dataclass
class MarkdownLink:
    start: int
    end: int
    prefix: str
    target: str
    suffix: str


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


def find_label_end(content: str, label_start: int) -> int:
    index = label_start + 1
    while index < len(content):
        close = content.find("]", index)
        if close == -1:
            return -1
        if close > label_start and content[close - 1] == "\\":
            index = close + 1
            continue
        lookahead = close + 1
        while lookahead < len(content) and content[lookahead].isspace():
            lookahead += 1
        if lookahead < len(content) and content[lookahead] == "(":
            return close
        index = close + 1
    return -1


def find_target_end(content: str, target_start: int) -> int:
    depth = 0
    index = target_start
    while index < len(content):
        character = content[index]
        if character == "\\":
            index += 2
            continue
        if character == "(":
            depth += 1
        elif character == ")":
            if depth == 0:
                return index
            depth -= 1
        index += 1
    return -1


def iter_markdown_links(content: str):
    """Yield inline Markdown links only.

    This scanner intentionally handles inline `[]()` links used in the docs tree.
    It does not parse reference-style links or arbitrary HTML.
    """

    index = 0
    while index < len(content):
        label_start = content.find("[", index)
        if label_start == -1:
            break

        link_start = (
            label_start - 1
            if label_start > 0 and content[label_start - 1] == "!"
            else label_start
        )
        label_end = find_label_end(content, label_start)
        if label_end == -1:
            index = label_start + 1
            continue

        target_start = label_end + 1
        while target_start < len(content) and content[target_start].isspace():
            target_start += 1
        if target_start >= len(content) or content[target_start] != "(":
            index = label_end + 1
            continue
        target_start += 1
        target_end = find_target_end(content, target_start)
        if target_end == -1:
            index = label_end + 1
            continue

        yield MarkdownLink(
            start=link_start,
            end=target_end + 1,
            prefix=content[link_start:target_start],
            target=content[target_start:target_end],
            suffix=")",
        )
        index = target_end + 1


def split_anchor(target: str) -> tuple[str, str]:
    if "#" not in target:
        return target, ""
    base, anchor = target.split("#", 1)
    return base, f"#{anchor}"


def prepare_candidate_path(path: PurePosixPath) -> PurePosixPath:
    if not path.suffix:
        path = path.with_suffix(".md")

    normalized = PurePosixPath(posixpath.normpath(path.as_posix()))
    normalized_text = normalized.as_posix()
    aliased = SOURCE_ALIASES.get(normalized_text, normalized_text)
    return PurePosixPath(aliased)


def language_for_source(source_path: str) -> str:
    return PurePosixPath(source_path).parts[0]


def parse_doc_target(target: str) -> tuple[str, str] | None:
    if target.startswith(("http://", "https://", "mailto:", "#")):
        return None

    base_target, anchor = split_anchor(target)
    if not base_target:
        return None

    suffix = PurePosixPath(base_target).suffix.lower()
    if suffix and suffix != ".md":
        return None

    return base_target, anchor


def resolve_absolute_target(base_target: str, source_path: str) -> PurePosixPath:
    source_language = language_for_source(source_path)
    target = base_target.lstrip("/")
    if not target:
        return PurePosixPath(source_language) / "index.md"
    if target in {"en", "en/"}:
        return PurePosixPath("en") / "index.md"
    if target in {"zh", "zh/"}:
        return PurePosixPath("zh") / "index.md"
    if target.startswith(("en/", "zh/")):
        return prepare_candidate_path(PurePosixPath(target))
    language_root = source_language if source_language == "en" else "zh"
    return prepare_candidate_path(PurePosixPath(language_root) / target)


def resolve_relative_target(base_target: str, source_path: str) -> PurePosixPath:
    source = PurePosixPath(source_path)
    return prepare_candidate_path(source.parent / base_target)


def find_candidates_by_suffix(
    language: str, suffix: str, source_pages: tuple[str, ...]
) -> list[str]:
    prefix = f"{language}/"
    full_suffix = f"{language}/{suffix}"
    return [
        page
        for page in source_pages
        if page.startswith(prefix)
        and (page == full_suffix or page.endswith(f"/{suffix}"))
    ]


def find_existing_source_path(
    candidate: PurePosixPath,
    source_root: Path,
    source_pages: tuple[str, ...],
) -> ResolutionResult:
    candidate_text = candidate.as_posix()
    if (source_root / candidate_text).exists():
        return ResolutionResult(resolved_path=candidate_text)

    language = candidate.parts[0] if candidate.parts else ""
    suffix = (
        PurePosixPath(*candidate.parts[1:]).as_posix()
        if len(candidate.parts) > 1
        else ""
    )
    if not suffix:
        return ResolutionResult(resolved_path=None)

    matches = find_candidates_by_suffix(language, suffix, source_pages)
    if len(matches) == 1:
        return ResolutionResult(resolved_path=matches[0])
    if len(matches) > 1:
        return ResolutionResult(
            resolved_path=None,
            ambiguous_matches=tuple(sorted(matches)),
        )
    return ResolutionResult(resolved_path=None)


class LinkResolver:
    def __init__(self, source_root: Path):
        self.source_root = Path(source_root)
        self.source_pages = discover_source_pages(str(self.source_root))

    def resolve(self, target: str, source_path: str) -> ResolutionResult:
        parsed_target = parse_doc_target(target)
        if parsed_target is None:
            return ResolutionResult(resolved_path=None)

        base_target, _ = parsed_target
        if base_target.startswith("/"):
            candidate = resolve_absolute_target(base_target, source_path)
        else:
            candidate = resolve_relative_target(base_target, source_path)

        return find_existing_source_path(candidate, self.source_root, self.source_pages)

    def resolve_path(self, target: str, source_path: str) -> str | None:
        return self.resolve(target, source_path).resolved_path


def rewrite_link_target(target: str, source_path: str, resolver: LinkResolver) -> str:
    parsed_target = parse_doc_target(target)
    if parsed_target is None:
        return target

    base_target, anchor = parsed_target
    resolved = resolver.resolve_path(base_target, source_path)
    if resolved is None:
        return target

    return f"{page_name_for_source(resolved)}{anchor}"


def rewrite_links(
    content: str,
    source_path: str,
    resolver: LinkResolver,
) -> str:
    links = list(iter_markdown_links(content))
    if not links:
        return content

    result: list[str] = []
    previous_end = 0
    for link in links:
        result.append(content[previous_end : link.start])
        result.append(
            f"{link.prefix}{rewrite_link_target(link.target, source_path, resolver)}{link.suffix}",
        )
        previous_end = link.end
    result.append(content[previous_end:])
    return "".join(result)


def find_unresolved_doc_links(source_root: Path) -> list[str]:
    unresolved: list[str] = []
    root = Path(source_root)
    resolver = LinkResolver(root)

    for source_path in resolver.source_pages:
        content = (root / source_path).read_text(encoding="utf-8")
        for link in iter_markdown_links(content):
            parsed_target = parse_doc_target(link.target)
            if parsed_target is None:
                continue
            resolution = resolver.resolve(link.target, source_path)
            if resolution.resolved_path is not None:
                continue
            if resolution.ambiguous_matches:
                unresolved.append(
                    f"{source_path} -> {link.target} (ambiguous: {', '.join(resolution.ambiguous_matches)})",
                )
                continue
            unresolved.append(f"{source_path} -> {link.target}")

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


def build_sidebar(page_infos: list[PageInfo]) -> str:
    lines: list[str] = []
    language_labels = {"zh": "Chinese", "en": "English"}

    for language in ("zh", "en"):
        infos = [
            info
            for info in page_infos
            if info.language == language and not info.is_index
        ]
        infos.sort(key=lambda info: info.source_path)

        lines.append(f"### {language_labels[language]}")
        lines.append("")
        lines.append(
            f"- [{'Home' if language == 'en' else '首页'}]({'Home-en' if language == 'en' else 'Home'})",
        )
        lines.append(
            f"- [{'Docs Entry' if language == 'en' else '文档入口'}]({language}-index)",
        )

        grouped: dict[str, list[PageInfo]] = {}
        for info in infos:
            grouped.setdefault(info.group, []).append(info)

        for group_name in sorted(grouped):
            lines.append(f"- {sidebar_group_name(group_name)}")
            for info in grouped[group_name]:
                lines.append(f"  - [{info.title}]({info.page_name})")

        lines.append("")

    return normalize_content("\n".join(lines))


def build_page_info(
    source_root: Path, source_path: str, resolver: LinkResolver
) -> PageInfo:
    source_file = source_root / source_path
    content = source_file.read_text(encoding="utf-8")
    content = strip_frontmatter(content)
    content = rewrite_links(content, source_path=source_path, resolver=resolver)
    content = normalize_content(content)

    relative = PurePosixPath(source_path)
    parts = relative.parts
    group = "root" if len(parts) <= 2 else parts[1]

    return PageInfo(
        source_path=source_path,
        page_name=page_name_for_source(source_path),
        title=extract_title(content, source_path),
        content=content,
        language=language_for_source(source_path),
        group=group,
        is_index=relative.name == "index.md",
    )


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
    resolver = LinkResolver(source_root)

    page_infos = [
        build_page_info(source_root, source_path, resolver)
        for source_path in resolver.source_pages
    ]
    page_names = {info.page_name for info in page_infos}

    for info in page_infos:
        if info.is_index and not info.content.strip():
            generated = build_language_index(info.language, page_names)
            info.content = generated
            info.title = extract_title(generated, info.source_path)

    desired_files = {f"{info.page_name}.md": info.content for info in page_infos}
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

    managed_files = set(desired_files)
    write_manifest(wiki_root, managed_files)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Sync AstrBot docs content to GitHub wiki pages."
    )
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

    sync_docs_to_wiki(
        source_root=Path(args.source_root), wiki_root=Path(args.wiki_root)
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
