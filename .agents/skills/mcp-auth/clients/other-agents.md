# Other agents connection (no plugin)

Applies to any agent without a ReadMe plugin, including local coding agents such as OpenCode, Gemini CLI, GitHub Copilot CLI, VS Code, and Windsurf. It also works for Claude Code, Codex, and Cursor if the user does not want a plugin.

This setup does not use a plugin. It uses two separate CLIs:

- [`npx skills`](https://github.com/vercel-labs/skills) installs the ReadMe skills.
- [`npx add-mcp`](https://github.com/neondatabase/add-mcp) registers the ReadMe MCP server.

Both need Node.js. Both detect installed agents and ask which ones to target; use `-a <agent>` to pick one directly.

*Note: Do not combine this with a ReadMe plugin in the same agent. It results in duplicate skills and duplicate ReadMe MCP servers.*

## Install the ReadMe skills

*Note: Only run this step if the user does not already have the ReadMe skills available.*

```sh
npx skills add readmeio/agent-plugins
```

| Scope | Flag | When to use |
| --- | --- | --- |
| Project | (default) | Working in a BiDi synced repository. Skills go in the project and can be committed for other contributors |
| User | `-g` | Working through MCP. Skills are available in every project |

Run `npx skills update` later to pull new versions.

### Confirmation

That you are able to read the ReadMe skills, e.g. `managing-readme-docs`.

## Add the ReadMe MCP server

```sh
npx add-mcp "https://docs.readme.com/mcp?projects=developers" --name readme
```

This takes the same `-g` and `-a <agent>` flags. Without an API key the server only has read access to public docs.

### Configure the API key

The user can access their API key via **Settings → API Keys** in their ReadMe project.

*NOTE: For first-time setup on ReadMe, the user may be creating a new project. If they are, they will not yet have their API key. In that case skip this step and when the user creates their project the user/you can configure the actual API key.*

The user should run this themselves in a terminal. `add-mcp` prompts for `README_API_KEY`, so the key never enters the chat or shell history:

```sh
npx add-mcp "https://docs.readme.com/mcp?projects=developers" --name readme --header 'Authorization: Bearer ${README_API_KEY}'
```

Keep the single quotes so the shell does not expand the variable. Re-running with the same name replaces the anonymous `readme` entry.

The key may be written into the agent's config file. With project scope, check that file is not committed; prefer `-g` when adding a key.

### Confirmation

That you are able to successfully list tools from the ReadMe MCP server. The user may need to restart their agent before the configuration is recognized.

For an agent that neither CLI supports, consult the agent's own skills and MCP setup docs, using the same skills repository and MCP URL.
