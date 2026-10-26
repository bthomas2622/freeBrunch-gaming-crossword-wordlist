# MCP server

The MCP server lets readers connect AI tools such as Cursor, VS Code, and Claude to the project's API reference and documentation over the Model Context Protocol. It is served at `https://<docs domain>/mcp`, where the docs domain is the custom domain or `<subdomain>.readme.io`. Settings live under `mcp`. See [MCP servers](https://docs.readme.com/main/docs/mcp-servers).

Related settings elsewhere:

- The MCP entries in the "Open with…" menu (`appearance.ai.options.mcp.*`) and the MCP server card (`ai.discovery.mcp_server_card`) are in [agent discovery](agent-discovery.md).
- The `search` and `fetch` tools depend on Ask AI, covered in [AI settings](ai.md).
- The site password (`privacy.password`) is separate from the MCP password and lives in [access and domain](access-and-domain.md).

## Server

### Turn the MCP server on or off

Set `mcp.state` to `enabled` or `disabled`.

While the project is unpublished, the server only accepts a project API key. Turning the server on also makes the MCP menu entries and the MCP server card in [agent discovery](agent-discovery.md) take effect.

### Password-protect the MCP server

Set `mcp.privacy.password` to the password; set it to `null` to remove it. Users then authenticate with this password (sent in the `x-readme-auth` header) or with a project API key.

The password is write-only. A 200 response with `mcp.has_password` matching the change in the next read (`true` when set, `false` when removed) confirms it, so no dashboard check is needed.

## Endpoints and tools

### Disable endpoints, or expose hidden and deprecated ones

Every endpoint in the project's API definitions becomes an MCP tool, except endpoints whose reference page is hidden or deprecated.

- `mcp.disabled_routes` (full array): endpoints to remove.
- `mcp.explicitly_enabled_routes` (full array): hidden or deprecated endpoints to expose anyway.

Both use route ids of the form `<operationId>-<definition filename>`, for example `getPet-petstore.json`. ReadMe generates an `operationId` when the definition has none, so confirm ids that are not in the definition at `#/settings/mcp`. Ids are saved without validation, so a typo saves silently and changes nothing.

A route listed in both arrays stays disabled: the API drops it from `explicitly_enabled_routes`.

### Disable built-in tools

Set `mcp.disabled_tools` (full array) to the names of built-in tools to remove. The available names are listed at `#/settings/mcp`; names are saved without validation.

The `search` and `fetch` documentation tools are only available when Ask AI is on and the project has the AI Booster Pack (see [AI settings](ai.md)).

### Add custom tools

Set `mcp.custom_tools` (full array). Each tool has:

- `title`: the tool name AI clients see, e.g. `pre-execute`
- `description`: when the agent should call it, e.g. "Call before any POST request"
- `body`: the instructions the agent receives when it calls the tool

Custom tools carry instructions, not code: use them to steer how agents use the API. On an enterprise child, titles must be unique across its sibling child projects; a clash is rejected with the conflicting project's name.

### Web-only

- Route ids and built-in tool names are listed at `#/settings/mcp`.
- MCP tool-call metrics are at `#/settings/metrics/mcp-tool-calls`.

## OAuth

`mcp.oauth_credentials` lets MCP users sign in to the customer's own API, so tool calls run with their access. It is distinct from `ai.discovery.oauth` in [agent discovery](agent-discovery.md), which only advertises the customer's authorization server to agents.

### Set OAuth credentials per security scheme

Set `mcp.oauth_credentials`, a map keyed by security scheme name from the API definition. Each entry takes `client_id`, `client_secret`, `authorization_url`, `token_url`, optional `scopes`, and `userinfo_url` for non-OIDC providers. Register `https://<docs domain>/mcp/oauth/callback` as the redirect URL with the OAuth provider.

The map is replaced in full: send every scheme to keep, and a scheme left out is deleted. `client_secret` is write-only:

- Omit it on an existing scheme to keep the stored secret.
- A new scheme without one is rejected.

A 200 response with the scheme listed in the next read confirms the scheme was saved. The secret cannot be read back, so ask the user to confirm it by signing in to the MCP server with OAuth.

### Customize the OAuth sign-in, success, and error pages

Set `mcp.oauth_pages.auth_url`, `success_url`, and `error_url` to full URLs on the customer's site. Users are sent there instead of ReadMe's default pages during MCP sign-in. Set a field to `null` to restore its default page.

## OpenAI app verification

### Set the OpenAI app challenge token

Set `mcp.openai_challenge_token` to the token from OpenAI's app submission flow. ReadMe serves it at `https://<docs domain>/.well-known/openai-apps-challenge` while the MCP server is on, which proves domain ownership to OpenAI.

The token is a single string of up to 256 characters with no whitespace inside it; a token with spaces is rejected. Set it to `null` or `""` to remove it. Projects sharing a domain, such as an enterprise group, must use the same token.
