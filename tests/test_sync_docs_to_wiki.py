from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


def load_sync_module():
    script_path = Path(__file__).resolve().parents[1] / "scripts" / "sync_docs_to_wiki.py"
    spec = spec_from_file_location("sync_docs_to_wiki", script_path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Unable to load module from {script_path}")
    module = module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class SyncDocsHelpersTest(unittest.TestCase):
    def test_page_name_for_nested_markdown_source(self):
        module = load_sync_module()

        self.assertEqual(
            module.page_name_for_source("zh/deploy/astrbot/docker.md"),
            "zh-deploy-astrbot-docker",
        )

    def test_strip_frontmatter_removes_leading_block(self):
        module = load_sync_module()

        source = "---\nlayout: home\n---\n\n# Title\n"

        self.assertEqual(module.strip_frontmatter(source), "# Title\n")

    def test_rewrite_links_handles_absolute_same_language_links(self):
        module = load_sync_module()

        content = "See [Docker](/deploy/astrbot/docker).\n"

        self.assertEqual(
            module.rewrite_links(content, source_path="zh/what-is-astrbot.md"),
            "See [Docker](zh-deploy-astrbot-docker).\n",
        )

    def test_rewrite_links_handles_relative_links(self):
        module = load_sync_module()

        content = "Use [Dify](../agent-runners/dify.md).\n"

        self.assertEqual(
            module.rewrite_links(
                content,
                source_path="zh/providers/dify.md",
            ),
            "Use [Dify](zh-providers-agent-runners-dify).\n",
        )

    def test_rewrite_links_handles_rewritten_root_paths(self):
        module = load_sync_module()

        content = "See [Connecting Model Services](/config/providers/start).\n"

        self.assertEqual(
            module.rewrite_links(content, source_path="zh/what-is-astrbot.md"),
            "See [Connecting Model Services](zh-providers-start).\n",
        )

    def test_rewrite_links_leaves_local_asset_links_unchanged(self):
        module = load_sync_module()

        with TemporaryDirectory() as temp_dir:
            source_root = Path(temp_dir) / "docs"
            (source_root / "zh" / "use").mkdir(parents=True)
            (source_root / "zh" / "images").mkdir(parents=True)
            (source_root / "zh" / "use" / "guide.md").write_text("# Guide\n", encoding="utf-8")
            (source_root / "zh" / "images" / "diagram.png").write_bytes(b"png")

            content = "![Diagram](../images/diagram.png)\n"

            self.assertEqual(
                module.rewrite_links(
                    content,
                    source_path="zh/use/guide.md",
                    source_root=source_root,
                ),
                content,
            )

    def test_sync_writes_pages_and_sidebar(self):
        module = load_sync_module()

        with TemporaryDirectory() as temp_dir:
            source_root = Path(temp_dir) / "docs"
            wiki_root = Path(temp_dir) / "wiki"
            (source_root / "zh").mkdir(parents=True)
            (source_root / "en").mkdir(parents=True)

            (source_root / "zh" / "index.md").write_text(
                "---\nlayout: home\n---\n\n# 中文首页\n\nSee [Guide](/deploy/guide).\n",
                encoding="utf-8",
            )
            (source_root / "zh" / "deploy").mkdir(parents=True)
            (source_root / "zh" / "deploy" / "guide.md").write_text(
                "# 部署指南\n",
                encoding="utf-8",
            )
            (source_root / "en" / "index.md").write_text(
                "# English Home\n\nSee [Guide](/en/deploy/guide).\n",
                encoding="utf-8",
            )
            (source_root / "en" / "deploy").mkdir(parents=True)
            (source_root / "en" / "deploy" / "guide.md").write_text(
                "# Deployment Guide\n",
                encoding="utf-8",
            )

            module.sync_docs_to_wiki(source_root=source_root, wiki_root=wiki_root)

            self.assertTrue((wiki_root / "Home.md").exists())
            self.assertTrue((wiki_root / "Home-en.md").exists())
            self.assertTrue((wiki_root / "_Sidebar.md").exists())
            self.assertTrue((wiki_root / "zh-index.md").exists())
            self.assertTrue((wiki_root / "en-index.md").exists())
            self.assertIn(
                "[Guide](zh-deploy-guide)",
                (wiki_root / "zh-index.md").read_text(encoding="utf-8"),
            )

    def test_sync_preserves_unknown_wiki_pages(self):
        module = load_sync_module()

        with TemporaryDirectory() as temp_dir:
            source_root = Path(temp_dir) / "docs"
            wiki_root = Path(temp_dir) / "wiki"
            (source_root / "zh").mkdir(parents=True)
            (source_root / "en").mkdir(parents=True)

            (source_root / "zh" / "index.md").write_text("# 中文首页\n", encoding="utf-8")
            (source_root / "en" / "index.md").write_text("# English Home\n", encoding="utf-8")

            wiki_root.mkdir(parents=True)
            handwritten = wiki_root / "zh-handwritten.md"
            handwritten.write_text("# Keep me\n", encoding="utf-8")

            module.sync_docs_to_wiki(source_root=source_root, wiki_root=wiki_root)

            self.assertTrue(handwritten.exists())

    def test_live_docs_have_no_unresolved_internal_doc_links(self):
        module = load_sync_module()

        unresolved = module.find_unresolved_doc_links(
            source_root=Path(__file__).resolve().parents[1],
        )

        self.assertEqual(unresolved, [])


if __name__ == "__main__":
    unittest.main()
