# Access and domain settings

Access and domain settings decide who can read the docs, how readers log in, how branches and OpenAPI definitions are shared, and which address the site is served from. The dashboard shows access at `#/settings/project-settings`, custom login at `#/settings/custom-login`, the login webhook at `#/settings/personalized-docs`, and the domain at `#/settings/custom-domain`.

Most changes here can lock readers out or break links the moment they are saved. Spell out the reader-facing effect in the Plan step.

Related settings elsewhere:

- Keeping a public site out of search results (`allow_crawlers`) is in [SEO](seo.md).
- The MCP server has its own password (`mcp.privacy.password`), covered in [MCP server](mcp.md).
- The variables a login fills in (`variable_defaults`) are in [general](general.md).

## Who can view the site

### Choose who can view the site

Set `privacy.view`:

- `public`: anyone can read the docs
- `admin`: only members of the project team can read them
- `password`: readers must enter the site password
- `custom_login`: readers are sent to the company's own login page (see [Custom login](#custom-login))

Requires Pro for `admin` and `password`, and Enterprise for `custom_login`. Check `plan.type` before writing. On a lower plan, leave `privacy.view` as it is and send the user to `#/settings/manage-plans` to upgrade.

- Switching to `password` must include `privacy.password` in the same request, even when a password was set before; otherwise the request is rejected.
- Switch to `custom_login` only once `custom_login.login_url` is set (it can go in the same request).
- Any change to `privacy.view` revokes every outstanding branch share link.
- A non-public site also stops advertising itself through its `/.well-known/` endpoints and drops the `Content-Signal` line from `robots.txt`.

### Set the site password

Set `privacy.password`. It is write-only and always reads back as `null`. A 200 response means it was saved; the dashboard cannot show it either, so ask the user to test it in a private browser window.

Readers enter the password once per browser. Changing it does not sign out readers who already entered the old one.

## Custom login

Custom login sends readers to the company's own login page. After the reader signs in there, the company's server signs a JWT with the project's JWT secret and sends the reader back to the docs with it, which logs them in and can fill in Personalized Docs variables. See [Custom login](https://docs.readme.com/main/docs/custom-login-page).

### Set up custom login

Set the fields under `custom_login`:

- `login_url`: where readers go to log in. ReadMe adds a `redirect` query parameter with the page they came from.
- `logout_url`: where readers go when they log out, so the login provider can end its session too.
- `jwt_expiration_time`: minutes before a logged-in reader must log in again; `0` turns the timer off.

Setting `login_url` takes effect immediately, even while the site is public: every "Log in" link on the docs points at it. To require login for the whole site, also set `privacy.view` to `custom_login`.

On an enterprise child without its own `login_url`, the parent's is used.

### Rotate the JWT secret

`custom_login.jwt_secret` is the secret the company's server signs login tokens with. It reads back for team admins and is `null` for everyone else.

Set it to `""` to rotate it: ReadMe generates a new secret straight away, and tokens signed with the old one stop working until the company's server uses the new value. Any other value is ignored, so a secret cannot be chosen. In an enterprise group with a single child project, logins are signed with the parent's secret.

## Personalized Docs webhook

### Set the login webhook

Set `webhooks` to `[{ "action": "login", "url": "https://…" }]`, optionally with `timeout` in milliseconds (default 5000). When a reader logs in, ReadMe sends their email to this URL and merges the response into their data, which fills in the Personalized Docs variables. See [Personalized docs](https://docs.readme.com/main/docs/personalized-docs).

This array does not follow the replace-in-full rule:

- Only the first item is used. It replaces the existing webhook for the same `action`, or is added when there is none.
- An empty array is ignored, so the API cannot remove the webhook. Direct the user to support@readme.io to remove it.

In an enterprise group, the parent's webhook is called for logins on every child.

## Sharing

### Turn private branch share links on or off

Set `privacy.branches` to `enabled` (the default) or `disabled`. Share links let people outside the team preview an unmerged branch through a private, key-protected URL. Changing the value in either direction revokes every existing share link. See [Branches](https://docs.readme.com/main/docs/branches).

### Choose who can view the /openapi page

Set `privacy.openapi` to `admin` (the default, team members only) or `public`. The `/openapi` page lets visitors download the project's OpenAPI definitions. Public visitors and read-only team members get only the operations visible in the API reference; editors and admins get the complete definition.

## Domain

See [Setting up a custom domain](https://docs.readme.com/main/docs/setting-up-custom-domain).

### Set the custom domain

Set `custom_domain.name` to a domain such as `docs.example.com`, or `null` to remove it. Custom domains require the Starter plan or higher. On a lower plan, leave the domain unset and send the user to `#/settings/manage-plans` to upgrade.

After saving, read back `custom_domain.target` and give it to the user: they must point a CNAME record for the domain at that target. `custom_domain.validation.status` reads `unvalidated` until ReadMe confirms the DNS record. `target` and `validation` are read-only.

- Changing the domain issues a new SSL certificate, and the old domain stops serving the docs.
- A domain is rejected when it is not a valid hostname, is a `readme.io`, `readmessl.com`, or `amazonaws.com` address, or is already used by another project.
- In an enterprise group, the custom domain is usually set on the parent and serves every child.

### Change the subdomain

Set `subdomain`; the docs then live at `<subdomain>.readme.io`. Every existing link to the old `readme.io` address breaks, while a custom domain keeps working. The subdomain must be unique across ReadMe, at most 30 characters, and made of letters, digits, and single dashes. On an enterprise child, the subdomain can also be the child's path inside the group's site.

### Set the minimum TLS version and HSTS

These apply to the SSL certificate ReadMe issues for the custom domain.

- `ssl.min_tls_version` (`1.0` to `1.3`): connections using an older TLS version are rejected. Raising it can cut off old browsers and API clients.
- `hsts.include_subdomains`: adds `includeSubDomains` to the HSTS header, so browsers then insist on HTTPS for every subdomain of the docs domain. Browsers remember HSTS for a long time, so confirm those subdomains all support HTTPS before enabling it.

### Web-only

These are not exposed through the API:

- DNS, CAA, and SSL checks for the custom domain, and allowing the docs to be embedded in an iframe: `#/settings/custom-domain`
- Personalized Docs setup and webhook testing: `#/settings/personalized-docs`
- ReadMe, SAML, and OAuth login options for readers: the "End User Login" page linked from the dashboard settings
