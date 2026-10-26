# General settings

General settings cover the project's identity, project-wide defaults for versions and new pages, the glossary, variable defaults, and the reader feedback that feeds Metrics. Most live at the top level of the project; the dashboard shows them at `#/settings/project-settings`.

Related settings elsewhere:

- Search engine settings that sit next to these in the dashboard (`allow_crawlers`, `sitemap`, `canonical_url`, `seo.overwrite_title_tag`) are in [SEO](seo.md).
- Who can view the site, the subdomain, and the custom domain are in [access and domain](access-and-domain.md).
- The login webhook that fills variables for logged-in readers is in [access and domain](access-and-domain.md).

## Project identity

### Rename the project

Set `name`. Renaming changes no URLs: the subdomain is a separate setting (see [access and domain](access-and-domain.md)).

### Update the meta description

Set `description`, or `null` to clear it. It becomes the site's meta description, which search engines and link previews (Slack, social sites) show under the page title. Keep it to one or two sentences.

### Set the "Go Home" company link

Set `homepage_url` to the company's main website. ReadMe links to it from the docs so readers can get back to the main site. It is not the docs URL; that comes from the subdomain or custom domain.

## Versions and pages

### Change the default version

Set `default_version.name` to an existing version, such as `2.0`. Readers who open the docs without a version in the URL land on it, and it becomes the stable version that custom 404 pages are served from (see [SEO](seo.md)). A version that does not exist is rejected.

The version must exist first: list versions with `GET /v2/branches`, and create one with `POST /v2/branches` or in the dashboard at `#/settings/versions`. See [Versions](https://docs.readme.com/main/docs/versions).

### Turn suggested edits on or off

Set `suggested_edits` to `enabled` or `disabled`. When enabled, each page shows a link that sends readers to the project's GitHub repository to suggest a change. See [Suggested edits](https://docs.readme.com/main/docs/suggested-edits).

The link only works when the project is synced to a GitHub repository with Bi-directional Sync and that repository is public. The API saves the value either way, so check `git.connection.repository` first. ReadMe turns the setting off when the repository is made private, archived, or disconnected. The dashboard control is at `#/appearance/all-pages`.

### Set default visibility for new pages

Set `pages.default_visibility`:

- `public`: new pages appear in navigation and search
- `anyone_with_link`: new pages are hidden from navigation and only reachable by their URL until their visibility is changed

This only affects pages created after the change. Existing pages keep their own visibility.

## Glossary and variables

### Manage glossary terms

Glossary terms are short definitions that writers embed in pages; readers see the definition when they hover over the term. Each term is `{ term, definition }`.

To add or update terms without touching the rest, send `PATCH /v2/projects/me/glossary` with `{ "terms": [...] }`. Terms are matched by name, ignoring case and surrounding whitespace; a matching term is updated in place and new terms are added to the top. `PUT /v2/projects/me/glossary` replaces the whole glossary instead, and an empty list clears it. Both are safer than writing `glossary` on the project, which replaces the full array.

On an enterprise child, `glossary` also lists the parent's terms with `inherited: true`. These are read-only from the child: change them on the parent. When writing `glossary` on a child, send only the child's own terms (`inherited: false`); the inherited terms stay. If a child term has the same name as a group term, readers see the group term.

The glossary requires Pro. The dashboard shows it at `#/settings/glossary`.

### Set variable defaults

Variables let pages and the API reference show values specific to each reader, such as their API key, once they log in. `variable_defaults` sets the value readers see before that. Each item has a `name` and a `default`. See [Personalized docs](https://docs.readme.com/main/docs/personalized-docs).

- Every item needs an `id`. ReadMe assigns fresh ids on each write, so send `""` for a new variable.
- For a variable you add by hand, set `source` to `""`. `custom` is rejected.
- Items with `source` `server` or `security` come from the project's API definitions. Keep them in the array.

On an enterprise child, the parent's variables also apply to the child's pages, and a child variable with the same name wins. The child's `variable_defaults` lists only its own variables.

## Page feedback and metrics

These settings shape the data in the project's Metrics dashboard. See [Using metrics charts](https://docs.readme.com/main/docs/using-metrics-charts).

### Turn page-quality voting on or off

Set `metrics.voting.page_quality.enabled`. When on, every guide and reference page ends with thumbs-up and thumbs-down buttons. The votes appear at `#/settings/metrics/page-quality`.

### Turn email and company collection in metrics on or off

Set `metrics.pii.enabled`. When on, page views and votes from logged-in readers record the reader's email, and ReadMe uses it to attach the reader's company. When off, those events are recorded without the email or company. Turning it off affects new events only.

### Web-only

These general settings are not exposed through the API:

- Team members and roles: `#/settings/manage-team`
- Cloning or deleting the project: `#/settings/project-settings`
- Creating, renaming, or hiding versions in the dashboard: `#/settings/versions` (also possible through `/v2/branches`)
