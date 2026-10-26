# SEO settings

SEO settings control how search engines crawl and index the docs: `robots.txt`, `sitemap.xml`, title tags, the canonical URL, redirects, the custom 404 page, and search console verification. The dashboard shows most of them at `#/settings/project-settings` and redirects and the 404 page at `#/settings/error-pages`.

Related settings elsewhere:

- The meta description is in [general](general.md).
- `robots.txt` also carries the `Content-Signal` line for AI systems; content signals, `llms.txt`, and the other agent-facing settings are in [agent discovery](agent-discovery.md).
- Hiding the whole site from the public (`privacy.view`) is in [access and domain](access-and-domain.md).

## Crawling and indexing

### Allow or block search engine crawlers

Set `allow_crawlers` to `enabled` or `disabled`. When disabled, `robots.txt` blocks every path, the site stops advertising itself through its `/.well-known/` endpoints, and the `Content-Signal` line is dropped. Use it for staging or internal docs that are public but should stay out of search results.

On an enterprise group, `robots.txt` is served from the parent. A child with crawlers disabled adds `Disallow` rules for its own path to the group's file.

### Publish a sitemap.xml

Set `sitemap` to `enabled` to serve `/sitemap.xml` and list it in `robots.txt`. It is off by default.

On an enterprise group, set it on the parent: the parent's value controls the group's sitemap, which covers every child.

### Use custom metadata titles as the page <title>

Set `seo.overwrite_title_tag` to `enabled`. Pages that have a custom metadata title then use it as their HTML `<title>`, which is what search results show. Pages without one keep their normal title. Metadata titles are set per page, not here.

### Set the canonical URL

Set `canonical_url` to a base URL such as `https://docs.example.com`, or `null` to restore the default. Each page's canonical link is this base followed by the page path, so search engines credit that domain when the same docs are reachable from more than one. By default the base is the custom domain, or the `readme.io` subdomain when there is none. Use a full URL with its scheme, preferably `https://`.

## Redirects and 404

See [Error pages](https://docs.readme.com/main/docs/error-pages).

### Manage redirects

Set `redirects` to the full list of `{ from, to }` rules. Requires Pro.

- Rules only run for URLs that would otherwise 404, so a rule cannot hide a page that still exists.
- ReadMe tries the rules in order and uses the first match. Readers get a permanent (301) redirect, and the query string is kept.
- `from` is a regular expression matched against the whole path; leading and trailing slashes are ignored. Escape characters such as `.`, `?`, and `(` to match them literally. Capture groups can be reused in `to` as `$1`, `$2`, and so on. A `from` of `*` alone catches every missing URL.
- ReadMe adds rules here automatically when a page's slug changes. Read the current list and keep those rules when editing.

On an enterprise group, only the parent's redirects run, and rules written on a child are ignored. Set redirects on the parent, prefixing paths with the child's path.

### Set a custom 404 page

Set `pages.not_found` to the `uri` of a custom page, such as `/branches/stable/custom_pages/not-found`, or `null` to use ReadMe's default 404 page. Requires Pro.

The page must belong to the stable version (the default version). ReadMe does not check that the page exists, so create the custom page first and use the `uri` it returns. Readers see this page only after redirects have been tried.

## Search engine verification

### Set the Google or Bing verification code

Set `integrations.google.site_verification` (Google Search Console) or `integrations.bing.verify` (Bing Webmaster Tools), or `null` to remove it. ReadMe adds the matching verification meta tag to every page.

Send only the code: the `content` value of the meta tag the search console gives you. Codes may contain only letters, digits, underscores, and dashes, so a pasted full meta tag is rejected.
