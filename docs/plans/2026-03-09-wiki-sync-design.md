# AstrBot Wiki Sync Design

## Goal

Keep `AstrBot-docs` as the single source of truth and automatically synchronize its Markdown content to the GitHub wiki of `AstrBot`.

## Context

- The docs repository is a VitePress site with content under `zh/` and `en/`.
- The target wiki is `https://github.com/AstrBotDevs/AstrBot.wiki.git`.
- GitHub Wiki renders Markdown files from a git repository, but it does not understand VitePress-only constructs such as homepage frontmatter, navigation config, or site rewrites.

## Chosen Approach

Use a repository-local Python sync script plus a GitHub Actions workflow in `AstrBot-docs`.

- The workflow runs on pushes to `v4` and on manual dispatch.
- The publish job is gated to `refs/heads/v4`, so manual runs from feature branches cannot push branch-only content to the live wiki.
- The workflow clones the target wiki repository using a write-capable secret token.
- A Python script transforms docs content into wiki-friendly Markdown, writes managed pages into the cloned wiki working tree, and leaves unrelated wiki files untouched.
- The workflow commits and pushes only when the generated wiki output changes.
- The workflow uses concurrency control to prevent overlapping same-ref sync runs.

## Why This Approach

- `AstrBot-docs` becomes the authoritative source; contributors do not need to edit two repositories.
- The transformation logic stays versioned with the docs source.
- The script is testable without requiring GitHub Actions to run.
- We avoid brittle browser automation and avoid coupling to unsupported wiki APIs.

## Output Model

The script will generate the following wiki content:

- `Home.md`: Chinese landing page that links to the main Chinese and English entry pages.
- `Home-en.md`: English landing page.
- `_Sidebar.md`: generated navigation grouped by language and source path.
- One wiki page per source Markdown file under `zh/` and `en/`.

Each source file is mapped to a flattened wiki filename:

- `zh/what-is-astrbot.md` -> `zh-what-is-astrbot.md`
- `zh/deploy/astrbot/docker.md` -> `zh-deploy-astrbot-docker.md`
- `en/config/model-config.md` -> `en-config-model-config.md`

Flattening avoids directory-specific wiki behavior and makes link rewriting deterministic.

## Transformation Rules

### Markdown cleanup

- Remove leading VitePress frontmatter blocks.
- Keep the remaining Markdown body unchanged unless links need rewriting.
- Preserve external links, mailto links, and external images.

### Internal link rewriting

- Rewrite site-absolute doc links like `/deploy/astrbot/docker` to the corresponding wiki page name in the same language namespace.
- Rewrite `/en/...` links to English wiki pages.
- Rewrite relative Markdown links like `../agent-runners/dify.md` to the matching flattened wiki page.
- Preserve hash anchors when present.

### Home pages

- Do not try to render VitePress homepage frontmatter in the wiki.
- Generate simple wiki home pages with short explanatory text and stable entry links.

### Sidebar

- Generate `_Sidebar.md` from the discovered page set.
- Group pages under `Chinese` and `English` with nested path labels derived from source paths.

## Safety Rules

- The script writes only managed files it knows how to generate.
- The workflow does not delete unknown files from the wiki repository.
- If the wiki token is missing, the workflow fails clearly.
- If there are no wiki changes after generation, the workflow exits without a commit.

## CI Design

Workflow file: `.github/workflows/sync-wiki.yml`

- Trigger on:
  - `push` to `v4`
  - `workflow_dispatch`
- Path filters include docs content, the sync script, tests, and the workflow file itself.
- Steps:
  1. Check out `AstrBot-docs`
  2. Set up Python
  3. Run sync-script unit tests
  4. Clone `AstrBot.wiki.git` into a temporary `wiki/` directory
  5. Run the sync script
  6. Commit and push if the wiki tree changed

## Verification Plan

- Unit-test frontmatter stripping.
- Unit-test wiki filename mapping.
- Unit-test internal link rewriting for absolute and relative links.
- Unit-test that local asset links remain unchanged.
- Unit-test a small end-to-end sync into a temporary wiki directory.
- Run a live unresolved-link validation over the real `zh/` and `en/` trees.
- Run the docs build separately to ensure the repository remains healthy.

## Operational Notes

- Add a repository secret named `ASTRBOT_WIKI_TOKEN` in `AstrBot-docs` with permission to push to `AstrBot.wiki.git`.
- Contributors should treat generated wiki pages as managed output.
- If the wiki later needs hand-maintained pages, they should live outside the managed file set or the sync script should be updated explicitly.
