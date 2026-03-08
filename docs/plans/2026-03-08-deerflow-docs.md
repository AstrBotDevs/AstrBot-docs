# DeerFlow Agent Runner Docs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add bilingual DeerFlow Agent Runner documentation and update related navigation and overview pages so DeerFlow is documented like the existing third-party runners.

**Architecture:** Create dedicated Markdown pages for DeerFlow in `zh` and `en`, then wire them into the VitePress sidebar and the Agent Runner overview/usage pages. Base every documented field and note on the current AstrBot DeerFlow integration so the docs match shipped behavior.

**Tech Stack:** VitePress, Markdown, `.vitepress/config.mjs`

---

### Task 1: Add planning artifacts

**Files:**
- Create: `docs/plans/2026-03-08-deerflow-docs-design.md`
- Create: `docs/plans/2026-03-08-deerflow-docs.md`

**Step 1: Write the validated design doc**

Describe the agreed documentation scope, source of truth, affected files, and verification approach.

**Step 2: Save the implementation plan**

Capture the file list, task order, and verification command for the DeerFlow docs work.

**Step 3: Commit the planning docs**

Run: `git add docs/plans/2026-03-08-deerflow-docs-design.md docs/plans/2026-03-08-deerflow-docs.md && git commit -m "docs: add DeerFlow docs design plan"`

Expected: a new commit containing only planning documents.

### Task 2: Add DeerFlow documentation pages

**Files:**
- Create: `zh/providers/agent-runners/deerflow.md`
- Create: `en/providers/agent-runners/deerflow.md`
- Reference: `zh/providers/agent-runners/dify.md`
- Reference: `en/providers/agent-runners/dify.md`
- Reference: `astrbot/core/config/default.py` in the main AstrBot repo

**Step 1: Draft the Chinese page**

Document deployment prerequisites, AstrBot configuration fields, and runner selection steps using the same style as existing Chinese Agent Runner pages.

**Step 2: Draft the English page**

Mirror the same structure and verified fields in English.

**Step 3: Self-check content drift**

Verify the docs mention only real DeerFlow fields and supported defaults from the current AstrBot implementation.

### Task 3: Update navigation and related overview pages

**Files:**
- Modify: `.vitepress/config.mjs`
- Modify: `zh/providers/agent-runners.md`
- Modify: `en/providers/agent-runners.md`
- Modify: `zh/use/agent-runner.md`
- Modify: `en/use/agent-runner.md`
- Modify: `zh/what-is-astrbot.md`
- Modify: `en/what-is-astrbot.md`

**Step 1: Add DeerFlow to both sidebars**

Insert DeerFlow under the `Agent 执行器` and `Agent Runners` sidebar groups.

**Step 2: Update quick links and overview text**

Add DeerFlow links to the overview pages and extend high-level descriptions to mention DeerFlow.

**Step 3: Fix supported runner counts**

Change the usage pages from four built-in runners to five, and add DeerFlow to the bullet lists and examples.

### Task 4: Verify and prepare PR

**Files:**
- Verify: site-wide docs build output

**Step 1: Run the docs build**

Run: `npm run docs:build`

Expected: VitePress build completes successfully without new errors.

**Step 2: Review the diff**

Run: `git diff --stat && git diff`

Expected: only the intended DeerFlow docs, navigation, and related copy changes are present.

**Step 3: Commit the docs changes**

Run: `git add . && git commit -m "docs: add DeerFlow agent runner guide"`

Expected: a clean commit for the end-user documentation updates.

**Step 4: Open a pull request**

Push the branch and create a PR with a concise summary of the DeerFlow docs additions and navigation updates.
