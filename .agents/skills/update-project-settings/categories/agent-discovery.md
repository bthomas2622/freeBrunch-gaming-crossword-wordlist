# Agent discovery

Agent discovery settings control how AI agents and crawlers find and read the docs: `llms.txt`, Content-Signal preferences in `robots.txt`, markdown responses, `/.well-known/*` endpoints, WebMCP, the "Open with…" menu, and the agent-readiness score. See [AI discoverability](https://docs.readme.com/main/docs/ai-discoverability). The dashboard page is `#/settings/tools`.

Related settings elsewhere:

- Crawler access and the rest of `robots.txt` (`allow_crawlers`) are in [SEO](seo.md).
- The MCP server itself is in [MCP server](mcp.md).
- Ask AI is in [AI settings](ai.md).

These files publish only on a public site. A site behind a password, admin-only access, or custom login (see [access and domain](access-and-domain.md)) serves no `llms.txt`, `/.well-known/*` endpoints, `Link` headers, or content signals. A site that blocks crawlers (`allow_crawlers: disabled`) still serves `llms.txt` but none of the others. Settings save either way, so read `privacy.view` and `allow_crawlers` when a change seems to have no effect.

## Enterprise children

The `llms_txt`, `llms_txt_options`, and `ai.discovery` settings follow the group parent until the child sets its own value, after which the child's value wins. The exceptions are the API catalog, agent skills index, and MCP server card, which always follow the parent (see [Turn the API catalog, agent skills index, and MCP server card on or off](#turn-the-api-catalog-agent-skills-index-and-mcp-server-card-on-or-off)). The "Open with…" menu is set per project.

A write to any `ai.discovery` field on a child stores a value for every `ai.discovery` toggle at once. Toggles the child was inheriting stop following the parent and take ReadMe's defaults. To keep the values readers see, send the child's current value for every `ai.discovery` toggle along with the change. The `oauth` block is unaffected.

## llms.txt

`llms.txt` is a markdown index of the docs that AI agents read first. See [llms.txt](https://docs.readme.com/main/docs/llmstxt).

### Turn llms.txt on or off

Set `llms_txt` to `enabled` or `disabled`; it is on by default. The file is served at `/llms.txt`, and at `/<version>/llms.txt` for versions other than the default.

The hidden agent hint, the built-in agent skill, and both options below depend on it. On an enterprise parent it also controls the group-level `llms.txt`.

### Split llms.txt per section

Set `llms_txt_options.split.enabled` to `enabled` to make the root `llms.txt` link to per-section and per-category files instead of listing every page. Recommend it only for large projects whose full index exceeds the size limits some agents enforce; small projects leave it off so agents get every page in one fetch. The section and category files are served either way.

### Serve a custom llms.txt from the git repo

Set `llms_txt_options.custom.enabled` to `enabled` to serve hand-written `llms.txt` files from the project's git repo verbatim instead of the generated ones. See [Custom llms.txt](https://docs.readme.com/main/docs/llmstxt#custom-llmstxt).

It needs a connected git repo with the file committed at the repo root, a section root (`docs/llms.txt`, `reference/llms.txt`, `recipes/llms.txt`), or `custom_pages/llms.txt`, which serves `/page/llms.txt`. Where no custom file exists, the generated one is served. It is off by default so a file already in the repo never starts serving on its own.

## Content signals

### Set Content-Signal preferences

Set any of `ai.discovery.content_signal.*` to `true` (allow) or `false` (disallow). They are published as the `Content-Signal` directive in `robots.txt`:

- `ai_train`: use the content to train AI models
- `search`: index the content for AI search and retrieval
- `ai_input`: use the content as context in an AI agent's answer

All default to `false`. Signals declare the customer's preference to AI systems that honour the Content Signals draft; they do not block access. To block crawlers outright, use `allow_crawlers` in [SEO](seo.md).

## Markdown for agents

### Serve markdown to agents and advertise discovery links

- `ai.discovery.markdown_negotiation`: return a page as markdown when an agent requests it with `Accept: text/markdown`.
- `ai.discovery.link_headers`: add `Link` response headers that point agents at the discovery resources.

Both are on by default.

### Add sub-page, sibling, and "What's next" links to markdown pages

Set `ai.discovery.show_sub_pages`, `show_sibling_pages`, or `show_whats_next` to `true` to append that list of links to each page's markdown response, so agents can move between pages without returning to `llms.txt`. "What's next" links are the ones authors pick per page. All are off by default and leave the HTML pages unchanged.

### Turn the hidden agent hint on or off

Set `ai.discovery.agent_hint_banner`. When on, each page carries a hint visible only to agents, and each markdown page's `agentTools` front matter, pointing agents at `llms.txt`. It is on by default and only takes effect while `llms_txt` is enabled.

## Well-known endpoints

### Turn the API catalog, agent skills index, and MCP server card on or off

Each of these is on by default and serves a standard discovery file:

- `ai.discovery.api_catalog`: `/.well-known/api-catalog`, a linkset of the project's API definitions. Needs at least one API definition.
- `ai.discovery.agent_skills_index`: `/.well-known/agent-skills/index.json`, skills that teach agents how to read the docs. ReadMe's built-in skill needs `llms_txt`; skills committed to the git repo publish either way.
- `ai.discovery.mcp_server_card`: `/.well-known/mcp/server-card.json`, which advertises the project's MCP server. Needs the MCP server on (see [MCP server](mcp.md)).

On an enterprise child these always follow the parent: a write returns 200 but the value stays the parent's. Change them on the parent.

### Turn WebMCP on or off

Set `ai.discovery.webmcp`. When on, docs pages register search, navigate, read-page, and try-endpoint tools for in-browser agents through `navigator.modelContext`. It is on by default.

### Advertise OAuth/OIDC discovery metadata

Set `ai.discovery.oauth` to advertise the customer's own authorization server to agents that call the customer's API:

- `type`: `oidc` proxies `/.well-known/openid-configuration` from the issuer; `oauth2` proxies `/.well-known/oauth-authorization-server`; `none` (default) serves neither.
- `issuer_url`: the customer's issuer. It must be public and `https`.
- `authorization_servers`, `resource_identifier`, `scopes_supported`: published at `/.well-known/oauth-protected-resource`.

This only advertises metadata. Letting MCP users sign in to the customer's API is `mcp.oauth_credentials` in [MCP server](mcp.md).

On an enterprise child, `type: null` means the whole block follows the parent, and the URL fields show the parent's values. Setting a `type` gives the child its own block, starting from the parent's current values; set `type` back to `null` to follow the parent again.

## "Open with…" menu

### Turn the "Open with…" menu on or off, and choose its entries

Set `appearance.ai.dropdown` to `enabled` to show the menu as a button at the top right of each page; it is off by default. Its main button copies the page as markdown, and each enabled option in `appearance.ai.options` adds an entry to the dropdown:

- `ask_ai`: open Ask AI. Shows only when Ask AI is available and on (see [AI settings](ai.md)).
- `chatgpt`, `claude`: open the page in ChatGPT or Claude. Shows only on public sites.
- `clipboard`: copy the page as markdown.
- `view_as_markdown`: open the page's markdown version.
- `mcp.command`, `mcp.config`, `mcp.cursor`, `mcp.vscode`: copy an install command, copy a JSON config, or connect Cursor or VS Code to the MCP server. Show only while the MCP server is on (see [MCP server](mcp.md)).

The menu disappears when none of its options can show. The dashboard page for it is `#/settings/ai-readiness`.

## Agent-readiness score (read-only)

### Check the agent-readiness score

`ai.readiness` holds the latest [afdocs](https://afdocs.dev/) scorecard: an overall `score` and `grade`, `category_scores`, individual check `results`, and `resolutions` with suggested fixes for checks that did not pass. `cap` names a failing check that limits the score. `status: null` means no check has run.

Use `resolutions` to suggest which settings in this file to change. The API cannot run a check or change the score.

### Web-only

Running a readiness check: send the user to `#/settings/ai-readiness` and its "Run Check" button. See [AI overview](https://docs.readme.com/main/docs/ai-overview).
