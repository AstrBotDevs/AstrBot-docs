# AstrBot Wiki Sync CI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a tested sync pipeline in `AstrBot-docs` that converts VitePress Markdown into GitHub Wiki pages and pushes updates to `AstrBot.wiki.git`.

**Architecture:** A Python script in `scripts/` transforms `zh/` and `en/` Markdown files into flattened wiki page files, rewrites internal links, and generates `Home.md`, `Home-en.md`, and `_Sidebar.md`. A GitHub Actions workflow runs unit tests, clones the wiki repository with a token, invokes the script, and pushes only when generated output changes.

**Tech Stack:** Python 3 standard library, `unittest`, GitHub Actions, git CLI

---

### Task 1: Add failing tests for path mapping and frontmatter cleanup

**Files:**
- Create: `tests/test_sync_docs_to_wiki.py`
- Create: `scripts/sync_docs_to_wiki.py`

**Step 1: Write the failing test**

```python
import unittest

from scripts.sync_docs_to_wiki import page_name_for_source, strip_frontmatter


class SyncDocsHelpersTest(unittest.TestCase):
    def test_page_name_for_nested_markdown_source(self):
        self.assertEqual(
            page_name_for_source("zh/deploy/astrbot/docker.md"),
            "zh-deploy-astrbot-docker",
        )

    def test_strip_frontmatter_removes_leading_block(self):
        source = "---\nlayout: home\n---\n\n# Title\n"
        self.assertEqual(strip_frontmatter(source), "# Title\n")
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: FAIL with import error because `scripts/sync_docs_to_wiki.py` does not exist yet or helper functions are undefined.

**Step 3: Write minimal implementation**

```python
def page_name_for_source(source_path: str) -> str:
    return source_path[:-3].replace("/", "-")


def strip_frontmatter(content: str) -> str:
    if content.startswith("---\n"):
        _, _, remainder = content.split("---\n", 2)
        return remainder.lstrip("\n")
    return content
```

**Step 4: Run test to verify it passes**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: PASS for both helper tests.

**Step 5: Commit**

```bash
git add tests/test_sync_docs_to_wiki.py scripts/sync_docs_to_wiki.py
git commit -m "test: cover wiki sync path helpers"
```

### Task 2: Add failing tests for link rewriting

**Files:**
- Modify: `tests/test_sync_docs_to_wiki.py`
- Modify: `scripts/sync_docs_to_wiki.py`

**Step 1: Write the failing test**

```python
    def test_rewrite_links_handles_absolute_same_language_links(self):
        content = "See [Docker](/deploy/astrbot/docker).\n"
        rewritten = rewrite_links(content, source_path="zh/what-is-astrbot.md")
        self.assertEqual(rewritten, "See [Docker](zh-deploy-astrbot-docker).\n")

    def test_rewrite_links_handles_relative_links(self):
        content = "Use [Dify](../agent-runners/dify.md).\n"
        rewritten = rewrite_links(content, source_path="zh/providers/agent-runners.md")
        self.assertEqual(rewritten, "Use [Dify](zh-providers-agent-runners-dify).\n")
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: FAIL because `rewrite_links` is missing or returns original Markdown.

**Step 3: Write minimal implementation**

```python
def rewrite_links(content: str, source_path: str) -> str:
    # Replace wiki-internal Markdown links by resolving absolute and relative
    # doc paths, then map the resolved source file to a flattened page name.
    ...
```

Implement support for:
- `/...` root-language links under `zh`
- `/en/...` links under `en`
- relative `../...` and `./...` Markdown links
- optional hash anchors

**Step 4: Run test to verify it passes**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: PASS for the new link tests and existing helper tests.

**Step 5: Commit**

```bash
git add tests/test_sync_docs_to_wiki.py scripts/sync_docs_to_wiki.py
git commit -m "feat: rewrite internal links for wiki sync"
```

### Task 3: Add failing end-to-end generation test

**Files:**
- Modify: `tests/test_sync_docs_to_wiki.py`
- Modify: `scripts/sync_docs_to_wiki.py`

**Step 1: Write the failing test**

```python
    def test_sync_writes_pages_and_sidebar(self):
        with TemporaryDirectory() as temp_dir:
            source_root = Path(temp_dir) / "docs"
            wiki_root = Path(temp_dir) / "wiki"
            (source_root / "zh").mkdir(parents=True)
            (source_root / "en").mkdir(parents=True)
            (source_root / "zh" / "what-is-astrbot.md").write_text("# 中文首页\n")
            (source_root / "en" / "what-is-astrbot.md").write_text("# English Home\n")

            sync_docs_to_wiki(source_root=source_root, wiki_root=wiki_root)

            self.assertTrue((wiki_root / "Home.md").exists())
            self.assertTrue((wiki_root / "Home-en.md").exists())
            self.assertTrue((wiki_root / "_Sidebar.md").exists())
            self.assertTrue((wiki_root / "zh-what-is-astrbot.md").exists())
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: FAIL because the end-to-end sync entry point does not yet generate the full wiki tree.

**Step 3: Write minimal implementation**

```python
def sync_docs_to_wiki(source_root: Path, wiki_root: Path) -> None:
    # Discover Markdown files under zh/ and en/
    # Transform each file
    # Write generated pages plus Home.md, Home-en.md, and _Sidebar.md
    ...
```

Include managed-file tracking so the script rewrites only generated wiki files.

**Step 4: Run test to verify it passes**

Run: `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
Expected: PASS for the end-to-end test and all previous tests.

**Step 5: Commit**

```bash
git add tests/test_sync_docs_to_wiki.py scripts/sync_docs_to_wiki.py
git commit -m "feat: generate wiki pages from docs content"
```

### Task 4: Add the GitHub Actions workflow

**Files:**
- Create: `.github/workflows/sync-wiki.yml`
- Modify: `scripts/sync_docs_to_wiki.py`

**Step 1: Write the failing test**

Use a dry run command to validate the script entry point before wiring the workflow:

```bash
python3 scripts/sync_docs_to_wiki.py --help
```

Expected before implementation: missing CLI or incomplete argument parsing.

**Step 2: Run test to verify it fails**

Run: `python3 scripts/sync_docs_to_wiki.py --help`
Expected: FAIL if `main()` and `argparse` support are not present yet.

**Step 3: Write minimal implementation**

```python
def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-root", default=".")
    parser.add_argument("--wiki-root", required=True)
    ...
```

Create `.github/workflows/sync-wiki.yml` with these steps:
- checkout
- setup-python
- gate the publish job to `refs/heads/v4`
- run `python -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
- include the live unresolved-link validation in the test suite
- clone `AstrBot.wiki.git` using the `ASTRBOT_WIKI_TOKEN` repository secret
- run `python3 scripts/sync_docs_to_wiki.py --source-root . --wiki-root wiki`
- add workflow `concurrency` so same-ref runs do not overlap
- commit and push only if `git diff --cached` is non-empty in `wiki/`

**Step 4: Run test to verify it passes**

Run:
- `python3 scripts/sync_docs_to_wiki.py --help`
- `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`

Expected: both commands PASS.

**Step 5: Commit**

```bash
git add .github/workflows/sync-wiki.yml scripts/sync_docs_to_wiki.py tests/test_sync_docs_to_wiki.py
git commit -m "feat: automate docs sync to astrbot wiki"
```

### Task 5: Verify repository health and prepare PR

**Files:**
- Modify: `README.md` only if setup instructions for the wiki secret are needed

**Step 1: Run verification commands**

Run:
- `python3 -m unittest discover -s tests -p 'test_sync_docs_to_wiki.py' -v`
- `npm run docs:build`
- `git diff --stat`

Expected: tests PASS, VitePress build PASS, diff contains only intentional files.

**Step 2: Commit final adjustments**

```bash
git add docs/plans/2026-03-09-wiki-sync-design.md docs/plans/2026-03-09-wiki-sync-ci.md .github/workflows/sync-wiki.yml scripts/sync_docs_to_wiki.py tests/test_sync_docs_to_wiki.py
git commit -m "feat: sync docs content to astrbot wiki"
```

**Step 3: Push branch and open PR**

Run:

```bash
git push -u origin feat/wiki-sync-ci
gh pr create --repo AstrBotDevs/AstrBot-docs --base v4 --head zouyonghe:feat/wiki-sync-ci --title "feat: sync docs content to astrbot wiki" --body "$(cat <<'EOF'
## Summary
- add a tested script that converts VitePress docs into GitHub Wiki pages
- add a GitHub Actions workflow that syncs generated pages to AstrBot.wiki.git
- add design and implementation docs for the sync pipeline
EOF
)"
```

Expected: branch is pushed and GitHub returns a PR URL.
