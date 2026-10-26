# AI settings

AI settings live under `ai` and cover two audiences:

- **Readers:** Ask AI, the chat assistant that answers questions from the project's documentation.
- **Admins:** the in-product AI agent in the ReadMe editor, the Slack AI Writer, and the AI authoring tools.

How other AI agents find and read the docs (`llms.txt`, `ai.discovery`, the "Open with…" menu, the readiness score) lives in [agent discovery](agent-discovery.md).

## Ask AI

Ask AI lets readers ask questions and get answers drawn from the project's documentation. See [Ask AI](https://docs.readme.com/main/docs/ask-ai).

### Turn Ask AI on or off

Set `ai.owlbot.enabled`.

The `ai.owlbot.new_experience` is a legacy field - leave as `true` as the legacy experience is deprecated.

Without the AI Booster Pack, Ask AI offers limited customization. The Booster Pack is an add-on: `ai.owlbot.is_paying` reports whether the project has it.

### Choose where Ask AI appears

Set `ai.owlbot.placements` (full array). The schema lists the allowed values and the default. Things the schema doesn't say:

- `in_search` only renders in the unified search modal (`appearance.navigation.search_modal: unified`). It shows an 'Ask about "{query}"' option, and with the Booster Pack it also suggests related questions.
- The API stores placements in a fixed order, whatever order you send.
- An empty array hides every surface while leaving Ask AI enabled.
- On an enterprise child, placements come from the parent until the child sets its own.

Related settings elsewhere: the Ask AI accent color (`appearance.brand.askai`) and the unified search modal that combines search with Ask AI (`appearance.navigation.search_modal`) are in [appearance](appearance.md).

### Web-only

Ask AI's knowledge base, example questions, model, and answer customization are not exposed through the API. Send the user to `#/settings/owlbot`.

## In-product AI agent

The in-product AI agent is the assistant admins use inside the ReadMe web editor to write and edit documentation (`ai.chat`). It is separate from Ask AI: these settings change nothing readers see. See [AI agent](https://docs.readme.com/main/docs/aiagent).

### Give the agent custom knowledge

Set `ai.chat.knowledge.custom_knowledge` to free text the agent should always know, such as product terminology, target audience notes, and more. It is sent in full with every agent request rather than searched, so keep it concise; writes over the length limit are rejected. Set it to `null` to clear it. Style guides exist under the "Docs Audit" feature and are better configured there.

On an enterprise child, the child's own knowledge wins. Without its own, the child uses the parent's when the group shares knowledge.

### Let the agent search project content

Set `ai.chat.knowledge.use_project_knowledge` to `true` to let the agent search the project's indexed documentation when answering.

### Choose the agent's built-in models

`ai.chat.models` lists the built-in models with an `enabled` flag each. Read the current array, flip `enabled` on the models to change, and send the whole array back. The array is empty until models have been configured once in the dashboard; if it is empty, send the user to `#/settings/agent`. Custom models are managed in the dashboard at `#/settings/agent`.

## Slack AI Writer

The Slack AI Writer drafts documentation changes from Slack threads, opening a ReadMe branch per thread. See [Slack AI Writer](https://docs.readme.com/main/docs/slack-ai-writer). It is in open beta; users can toggle on this functionality from their settings.

### Let the Slack AI Writer merge or delete its branches

Set `ai.slack.writer.allow_branch_merge` and `ai.slack.writer.allow_branch_deletion`. Both default to `false`. Merging publishes the branch's changes, so confirm the user wants Slack threads to publish without review.

On an enterprise child these are read-only: the group sets them for every child.

## Feature availability (read-only)

These fields report whether an AI feature is available to the project. ReadMe manages them, so neither the API nor the dashboard can change them; users who need one changed should contact support@readme.io. A common case is that you do not want any of your users (including team members) to use these specific AI settings on the project.

- `ai.ai_writer.enabled`: AI Writer
- `ai.chat.enabled`: the in-product AI agent
- `ai.inline_editor.enabled`: AI Inline Editor
- `ai.linter.enabled`: AI Page Linter. Linter rules are configured in the dashboard at `#/settings/linter`
- `ai.docs_audit.enabled`: AI Docs Audit
- `ai.hidden`: when `true`, every AI feature is hidden and its settings are locked, whatever the other values say

Check these before configuring a feature: settings for an unavailable feature save but have no effect.
