# Claude Code connection

Applies to the Claude Code CLI and the Code tab in the Claude Desktop App. For the Chat interface in the Claude Desktop App or claude.ai refer to `./claude-chat.md` instead.

These commands can be run by Claude Code (in either the CLI or the desktop app), or the user can run them manually.

*Note: If the user only uses Claude Code via the desktop app, they can instead install the plugin via the app UI by following `./claude-chat.md`. This is NOT recommended - the API key cannot be edited after it is configured, and the plugin will not be available in the Claude Code CLI. Do not install via both methods, as this will result in duplicate ReadMe MCP servers.*

*Note 2: Claude code cloud agents should refer to the `./claude-chat.md` file - they must install via apps rather than locally in their cloud environment.

## Install the ReadMe Plugin

*Note: Only run this step if the user does not already have the ReadMe Plugin available*.

You must add the ReadMe plugin marketplace from the official agent-plugins repository, then install the plugin from that marketplace.

### User scope (Recommended)

Available to the user in every project.

```sh
claude plugin marketplace add https://github.com/readmeio/agent-plugins.git
claude plugin install readme@readme --scope user
```

### Project scope

Recommended if the user is working in a BiDi synced repository. The plugin is enabled in the project's `.claude/settings.json`, which is committed so that other contributors are prompted to install it.

```sh
claude plugin marketplace add https://github.com/readmeio/agent-plugins.git --scope project
claude plugin install readme@readme --scope project
```

The API key is never committed to the repository - it is kept in the user's OS keychain. Each contributor must configure their own API key.

### Confirmation

That you are able to successfully read skills from the installed ReadMe plugin.

## Configure the API key

The user can access their API key via **Settings → API Keys** in their ReadMe project.

*NOTE: For first-time setup on ReadMe, the user may be creating a new project. If they are, they will not yet have their API key. In that case skip this step and when the user creates their project the user/you can configure the actual API key.*

The user should run this themselves so that the key is not written to their shell history:

```sh
read -rsp "Input your ReadMe API key: " README_API_KEY && printf '{"api_key":"%s"}' "$README_API_KEY" | claude plugin configure readme@readme --values-stdin
```

Alternatively, running `claude plugin configure readme@readme` will prompt the user for the key.

### Confirmation

That you are able to successfully list tools from the ReadMe MCP server. The user may need to restart their session before the configuration is recognized.
