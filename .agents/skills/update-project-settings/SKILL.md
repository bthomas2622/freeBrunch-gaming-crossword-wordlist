---
name: update-project-settings
description: View and update ReadMe project settings, including appearance, branding, AI features, MCP server settings, agent discovery, llms.txt, SEO, access and domains, API reference, localization, and integrations. Use when a user wants to configure any settings on their ReadMe docs site.
---

# Update ReadMe project settings

Note - these settings are only configurable via the ReadMe MCP Server - BiDi sync users must use the server or configure on their ReadMe site.

## Workflow

1. **Target.** Retrieve the current project via `execute-request` with `GET https://api.readme.com/v2/projects/me` and confirm it is the project the user means. Note `parent` (enterprise) and `plan.type`.
   **Done:** The intended project is confirmed and its current settings are in hand.
2. **Locate.** Match the request to a category and read its corresponding category file. When the user asks broadly (e.g. "what can I change about my styling?"), offer that category's common operations. Inspect the `updateProject` schema with `get-endpoint` for the exact fields.
   **Done:** Every requested change maps to a schema field or to a named dashboard-only action.
3. **Plan.** Show the current and proposed value for every field. Flag each change that is noted as being plan-gated, needs an extra purchase, may be overridden by an enterprise parent, or is write-only (see [How project settings behave](#how-project-settings-behave)). Get explicit approval: changes go live as soon as they are saved and make sure the user is aware of this.
   **Done:** The user has approved every field change, with the before values recorded for rollback.
4. **Apply.** Complete any upload step the category file names first. Send `PATCH https://api.readme.com/v2/projects/me` containing only the approved fields.
   **Done:** The request returned 200, or the error is reported with the field it names.
5. **Verify.** Retrieve the project again and compare every changed field with the plan. A field that kept its old value usually means a plan gate. Confirm write-only fields in the dashboard unless the category file says otherwise, and hand visual checks to the user.
   **Done:** Every approved field matches the plan, or each mismatch is reported with its likely cause.

## How project settings behave

- **Live immediately.** Settings are project-wide, apply to every branch and version, and are visible to readers as soon as they are saved. There is no draft or preview, so the recorded before values are the rollback.
- **Partial updates.** Send only the fields being changed; nested objects merge with the stored values.
- **Arrays are replaced in full.** Any array you send becomes the complete new value. Read the current array, edit it, and send the whole array back; sending one item deletes the rest. Category files name the exceptions. Keyed maps vary, so read the field's schema description before writing one.
- **Read-only fields.** Fields whose schema description says "Read-only" are ignored on write.
- **Write-only fields.** Fields marked write-only, such as site and MCP passwords and OAuth client secrets, can be set but are never returned. Other secrets, such as the JWT secret and integration keys, are returned to admins.
- **Plan-gated settings.** Some settings need a higher plan, such as Pro or Enterprise. Writes to a gated setting are silently ignored: the request still returns 200 and the old value stays. Category files mark each operation's tier. Check `plan.type` before writing, and don't write a setting below its tier. If the user wants to upgrade their plan, send the user to their plan page, reached by adding `#/settings/manage-plans` to any URL on their documentation domain.
- **Extra purchases.** Some features need an add-on beyond any plan, such as AI-enabled translations. Direct the user to sales@readme.io.
- **Enterprise parent projects.** A non-null `parent` means the project is a child in an enterprise group. Depending on the setting, the parent's value can override the child's, act as a default until the child sets its own, or be the only place the setting can be changed. Read the field's schema description for its inheritance rule before writing it on a child. Writing a value on a child, including a rollback to its before value, can stop that field inheriting from the parent.

## Categories

### General settings

Project name, meta description, company link, default version, suggested edits, new-page visibility, glossary, variable defaults, and Metrics feedback. Read [General settings](categories/general.md).

- Rename the project
- Update the meta description
- Set the "Go Home" company link
- Change the default version
- Turn suggested edits on or off
- Set default visibility for new pages
- Manage glossary terms
- Set variable defaults
- Turn page-quality voting on or off
- Turn email and company collection in metrics on or off

### Appearance

Brand, theme, fonts, layout, header navigation, page display, landing page, and custom code. Read [Appearance](categories/appearance.md).

- Upload or change the logo, favicon, and logo size
- Apply a theme preset and set the default color mode
- Set the primary, link, and fine-tuned colors (background, border, header, sidebar, breadcrumbs, Ask AI)
- Set the corner radius
- Choose heading, body, and code fonts, or upload and remove custom fonts
- Set text spacing
- Choose the layout style, full width, sticky header, and header style
- Choose the header link style and subnav alignment
- Show, hide, or rename built-in sections, and edit header links
- Choose the first page and where the logo links
- Turn collapsible categories, breadcrumbs, page icons, and the version picker on or off
- Choose the subheader layout and the classic or unified search modal
- Set the table of contents, changelog display, callout icons, and "What's Next" label
- Hide the ReadMe footer logo
- Edit the landing page hero and sections
- Add custom CSS, JavaScript, and HTML

### AI settings

Reader-facing Ask AI, the in-product AI agent, and the Slack AI Writer. Read [AI settings](categories/ai.md).

- Turn Ask AI on or off, and choose where readers can open it
- Give the in-product AI agent custom knowledge, and let it search project content
- Choose which built-in models the in-product AI agent can use
- Let the Slack AI Writer merge or delete the branches it opens
- Check whether AI Writer, Inline Editor, Linter, Docs Audit, or all AI features are available (read-only)

### MCP server

The MCP server readers connect AI tools to, with its endpoints, tools, OAuth sign-in, and OpenAI app verification. Read [MCP server](categories/mcp.md).

- Turn the MCP server on or off
- Password-protect the MCP server (write-only)
- Disable endpoints, or expose hidden and deprecated ones
- Disable built-in tools
- Add custom tools
- Set OAuth credentials per security scheme
- Customize the OAuth sign-in, success, and error pages
- Set the OpenAI app challenge token

### Agent discovery

How AI agents and crawlers find and read the docs: llms.txt, content signals, markdown responses, well-known endpoints, the "Open with…" menu, and the readiness score. Read [Agent discovery](categories/agent-discovery.md).

- Turn llms.txt on or off
- Split llms.txt per section (large projects only)
- Serve a custom llms.txt from the git repo
- Set Content-Signal preferences
- Serve markdown to agents and advertise discovery links
- Add sub-page, sibling, and "What's next" links to markdown pages
- Turn the hidden agent hint on or off
- Turn the API catalog, agent skills index, and MCP server card on or off
- Turn WebMCP on or off
- Advertise OAuth/OIDC discovery metadata
- Turn the "Open with…" menu on or off, and choose its entries
- Check the agent-readiness score (read-only)

### SEO settings

robots.txt crawling, sitemap, title tags, canonical URL, redirects, the custom 404 page, and search console verification. Read [SEO settings](categories/seo.md).

- Allow or block search engine crawlers
- Publish a sitemap.xml
- Use custom metadata titles as the page `<title>`
- Set the canonical URL
- Manage redirects
- Set a custom 404 page
- Set the Google or Bing verification code

### Access and domain settings

Who can view the site, site password, custom login, the login webhook, branch and OpenAPI sharing, custom domain, subdomain, and TLS/HSTS. Read [Access and domain settings](categories/access-and-domain.md).

- Choose who can view the site
- Set the site password (write-only)
- Set up custom login
- Rotate the JWT secret
- Set the login webhook
- Turn private branch share links on or off
- Choose who can view the /openapi page
- Set the custom domain
- Change the subdomain
- Set the minimum TLS version and HSTS

### API reference

The interactive API explorer, examples and code snippets, reference display options, API Designer editing, and API status. Read [API reference](categories/api-reference.md).

- Choose which parts of the API explorer are interactive (parameter inputs, authentication, Try It)
- Prefill parameters with default values
- Tune the request form: required-field validation, JSON body editing, filling optional objects
- Turn the OAuth flows experience on or off
- Show or hide request history
- Expand request examples, response examples, and response schemas by default
- Offer SDK-generated snippets
- Show or hide the OpenAPI download button
- Adjust how reference pages look (method badges, webhook badges, flat sections, parameter font, oneOf layout)
- Allow or block editing in the API Designer
- Show the API status to readers
- Check whether external SDK snippets are active (read-only)

### Localization

Site languages and guidance for ReadMe's AI translator, set on the enterprise group parent. Read [Localization](categories/localization.md).

- Turn translation on or off
- Add or remove languages
- Change the default language
- Keep words untranslated by the AI translator
- Give the AI translator guidance per language
- Check which languages ReadMe has unlocked for AI translation (read-only)

### Integrations

Third-party analytics, support widgets, fonts, translation widget, spam protection, and Postman. Read [Integrations](categories/integrations.md).

- Connect an analytics tool: Google Analytics, Heap, Segment, Koala
- Add the Intercom messenger, with optional identity verification
- Add the Zendesk widget
- Load an Adobe Fonts kit
- Add the Localize.js widget
- Protect forms with reCAPTCHA
- Store Postman credentials
- Connect Speakeasy
