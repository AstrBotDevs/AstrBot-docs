# DeerFlow Agent Runner Docs Design

## Goal

Add DeerFlow Agent Runner documentation to AstrBot docs in the same style as the existing third-party Agent Runner pages, with both Chinese and English coverage.

## Scope

- Add dedicated DeerFlow setup pages in `zh` and `en`
- Add DeerFlow to the Agent Runner sidebar groups
- Update Agent Runner overview pages to surface the new entry
- Update usage pages so the supported runner count and examples match current AstrBot behavior
- Update high-level introduction pages that list third-party Agent Runners

## Source of Truth

The documentation should follow the current AstrBot implementation instead of guessing DeerFlow behavior. The relevant implementation lives in the main AstrBot repository:

- `astrbot/core/config/default.py`
- `astrbot/core/agent/runners/deerflow/deerflow_agent_runner.py`
- `dashboard/src/i18n/locales/zh-CN/features/config-metadata.json`
- `dashboard/src/i18n/locales/en-US/features/config-metadata.json`

The documented DeerFlow-specific fields are:

- `deerflow_api_base`
- `deerflow_api_key`
- `deerflow_auth_header`
- `deerflow_assistant_id`
- `deerflow_model_name`
- `deerflow_thinking_enabled`
- `deerflow_plan_mode`
- `deerflow_subagent_enabled`
- `deerflow_max_concurrent_subagents`
- `deerflow_recursion_limit`

## Content Strategy

Follow the structure already used by `Dify`, `Coze`, and `Alibaba Cloud Bailian Application`:

1. short introduction with supported version
2. preparation section that points users to DeerFlow official deployment/config docs
3. AstrBot-side configuration steps
4. Agent Runner selection steps
5. concise operational notes only when backed by code or official DeerFlow docs

The new pages should stay practical and avoid marketing language. They should not invent setup steps that are not validated by AstrBot or DeerFlow official docs.

## Navigation Changes

Update both locale sidebars under the Agent Runner section so DeerFlow appears beside the existing third-party runners.

## Related Copy Updates

Update summary pages that currently list only Dify, Coze, and Bailian so they also mention DeerFlow when describing supported third-party Agent Runners.

## Verification

Run `npm run docs:build` in the docs repository worktree after all edits.
