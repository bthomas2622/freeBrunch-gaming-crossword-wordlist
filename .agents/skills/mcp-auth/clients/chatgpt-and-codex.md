# ChatGPT & Codex Connections

Applies to ChatGPT web and desktop, Codex in the ChatGPT desktop application, and the Codex CLI. The Codex CLI and the ChatGPT desktop app share the same `~/.codex/config.toml`, so configuring one configures both.

## Running the `codex` commands

### Recommended: Use Codex and have agent setup.

This approach does not require user involvement aside from approving changes to the local `~/.codex/config.toml` file. Ensure that the user would prefer you to setup for them, and let them know that they can instead run the commands below in their terminal themselves if they would prefer.

The ChatGPT desktop app bundles its own `codex` binary, so the user does not need the Codex CLI installed. If `codex` is not on the PATH, or `codex plugin` is not recognized (an outdated Codex CLI), use the bundled binary instead:

```sh
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex
```

## Install the ReadMe Plugin

*Note: Only run this step if the user does not already have the ReadMe Plugin available*.

### ChatGPT Web

On ChatGPT web you currently cannot install the ReadMe Plugin.

### Codex CLI & ChatGPT Desktop App

You must add the ReadMe plugin marketplace from the official agent-plugins repository, then install the plugin from that marketplace.

```sh
codex plugin marketplace add https://github.com/readmeio/agent-plugins.git
codex plugin add readme@readme
```

If the `codex` commands cannot be run, add the following to `~/.codex/config.toml` instead:

```toml
[marketplaces.readme]
source_type = "git"
source = "https://github.com/readmeio/agent-plugins.git"

[plugins."readme@readme"]
enabled = true
```

### Confirmation

To confirm successful installation, verify that you can now see the ReadMe plugin and its available skills. The user may have to restart their application for this installation to be recognized.

## Install the ReadMe MCP Server

Unfortunately, due to constraints from OpenAI the ReadMe MCP server cannot be installed with authentication via the plugin and must be configured manually.

### ChatGPT Web

Currently no MCP configuration is supported via ChatGPT web due to limitations from OpenAI. Install and use either the desktop application or the Codex CLI instead.

### Codex CLI & ChatGPT Desktop App

*NOTE: For first-time setup on ReadMe, the user may be creating a new project. If they are, they will not yet have their API key. In that case leave the api key as a placeholder and when the user creates their project the user/you can modify the configuration with the actual API key.*

```sh
codex mcp add readme \
  --url https://docs.readme.com/mcp \
  --bearer-token-env-var README_API_KEY
```

The user must then set `README_API_KEY` in their environment. The ChatGPT desktop app does not inherit environment variables from the user's shell - if the user uses the desktop app, set the header directly in `~/.codex/config.toml` instead:

```toml
[mcp_servers.readme]
url = "https://docs.readme.com/mcp"
http_headers = { Authorization = "Bearer YOUR_README_API_KEY" }
```

If the user wants to connect to more than one ReadMe project, register an MCP server per project with the same URL but different names:

```sh
codex mcp add readme_projectA \
  --url https://docs.readme.com/mcp \
  --bearer-token-env-var README_PROJECT_A_API_KEY

codex mcp add readme_projectB \
  --url https://docs.readme.com/mcp \
  --bearer-token-env-var README_PROJECT_B_API_KEY
```

### Confirmation

Ensure that the MCP server is visible and that you can run tools to verify that the step has been successfully completed.

## Codex Cloud Agents

Codex cloud agents cannot run these setup steps. Instead, they MUST setup via the UI. Give the user instructions for how to set this up manually through their UI.

This is a mix of the plugin, and a custom MCP server using the details provided here. On getting the API key the user must set it up manually themselves.

