# Appearance settings

Appearance settings live under `appearance` and control how the docs site looks to readers: brand, theme, fonts, layout, header navigation, page display, the landing page, and custom code.

Related settings elsewhere:

- The sidebar (categories and page order) is managed with the [manage-navigation](../../manage-navigation/SKILL.md) skill.
- The "Open with…" menu (`appearance.ai`) is in [agent discovery](agent-discovery.md).
- Ask AI placements are in [AI settings](ai.md).
- API reference display options (`reference.*`) are in [API reference](api-reference.md).
- Adobe Fonts (`integrations.typekit.key`) is in [integrations](integrations.md).

See [Design themes](https://docs.readme.com/main/docs/design-themes).

## Brand and theme

### Upload or change the logo

1. Upload the file with `POST https://api.readme.com/v2/images` (multipart field `file`). The response's `data.uri` looks like `/images/<id>`.
2. Set `appearance.logo.main.uri` (light) or `appearance.logo.dark_mode.uri` to that `uri`.

Only images uploaded to the same project are accepted. SVG, PNG, JPG, GIF, and ICO all work; SVG gives the sharpest logo. For PNG or JPG, add `?resize_height=80` to the upload to match the dashboard. The other logo fields (`url`, `name`, `width`, `height`, `color`) are filled in from the upload.

The main logo can be replaced but not removed: `null` is rejected. Older projects may have a legacy main logo with `uri: null` and only a `url`. A legacy logo cannot be set back through the API once replaced, so record `logo.main.url` and tell the user before replacing it.

The dark-mode logo only shows with the line header (`appearance.header.type: line`). Set its `uri` to `null` to remove it. When `brand.primary_color` is `null`, the site uses the main logo's color as its primary color.

### Set the logo size

Set `appearance.logo.size` to `default`, `medium`, or `large`. The `sidebar` layout always shows the small logo.

### Upload or change the favicon

Upload as for the logo, then set `appearance.logo.favicon.uri`. Use `.ico`, `.png`, or `.gif`; for PNG, add `?resize_height=16` to the upload to match the dashboard. Set `uri` to `null` to remove it.

### Apply a theme preset

Set `appearance.brand.theme_preset`:

- `boreal_owl`: Boreal, the default for new projects
- `hawk_owl`: Hawk
- `snowy_owl`: Snow
- `default`: a blank slate with no preset values

`custom` is a legacy value; leave it alone.

A preset supplies colors, heading and body fonts, and the sticky header for every field left `null`. A stored value always wins over the preset.

The API changes only the preset key. Switching in the dashboard also clears the color overrides and resets the layout fields. To match a dashboard switch, send in the same request:

- `null` for every color under `brand.background`, `brand.border`, `brand.header`, `brand.sidebar`, `brand.breadcrumbs`, and for `layout.sticky_header`
- the layout values for the chosen preset:

| Field | Boreal | Hawk | Snow | Default |
| --- | --- | --- | --- | --- |
| `appearance.layout.style` | `modern` | `compact` | `compact` | `classic` |
| `appearance.header.type` | `line` | `line` | `line` | `solid` |
| `appearance.header.link_style` (Pro) | `tabs` | `tabs` | `pills` | `tabs` |
| `appearance.header.subnav.alignment` | `center` | `start` | `center` | `start` |
| `appearance.border_radius` | `default` | `square` | `pill` | `default` |
| `appearance.toc_variant` | `line` | `line` | `dots` | `line` |
| `appearance.layout.full_width` | `disabled` | `enabled` | `disabled` | `disabled` |
| `reference.flat_sections` | `disabled` | `enabled` | `disabled` | `disabled` |
| `reference.method_badge_style` | `modern` | `classic` | `classic` | `classic` |

The primary, link, and Ask AI colors and the fonts are kept across a switch.

### Set the default color mode

Set `appearance.brand.theme` to `light`, `dark`, or `system`.

### Set the primary and link colors

Set `appearance.brand.primary_color` and `link_color`, plus `primary_color_dark` and `link_color_dark` for dark mode.

Every color field takes any CSS color: hex, `rgb()`, `hsl()`, a named color, or `var(--…)`. The characters `< > ; { } " ' \` and backticks are stripped on save. Set a color to `null` to fall back to the preset, then the ReadMe default.

### Fine-tune background, border, header, sidebar, breadcrumb, and Ask AI colors

Each field has a light value and a dark value (`color` / `color_dark`, or `border` / `border_dark`):

- `brand.background.color`: page background
- `brand.background.tint`: a subtle tinted overlay on the page background
- `brand.border.color`: default UI borders
- `brand.header.color`: header background. Presets use `transparent` together with the line header
- `brand.sidebar.border`: the sidebar separator. `transparent` removes it without touching other borders
- `brand.breadcrumbs.color`: breadcrumb text. `null` uses the link color
- `brand.askai.color`: the Ask AI button and accents

`null` falls back to the preset's value.

### Set the corner radius

Set `appearance.border_radius` to `default`, `square`, or `pill`. It rounds corners across the whole site, not only the header buttons.

### Web-only

The dashboard theme editor previews presets and colors before saving. API changes go live at once, so send users who want to try a look first to `#/appearance/theme-editor`.

## Typography

### Choose heading, body, and code fonts

Set `appearance.typography.heading_font`, `body_font`, and `code_font` to a Google Fonts family name, such as `Inter`. The site loads the family from Google Fonts.

The dashboard suggests a short list (such as Inter, Geist, Lora, and JetBrains Mono), but any Google Fonts family works.

`null` uses the preset's font (Hawk: Schibsted Grotesk headings; Snow: Fraunces headings), then the system font.

### Upload a custom font

Send the file to `POST https://api.readme.com/v2/fonts/{slot}` (multipart field `file`). Accepted formats are `.woff2`, `.woff`, `.ttf`, and `.otf`, up to 5 MB. The upload saves straight to the project, so no PATCH follows. Slots:

- `heading` → `typography.custom_heading` (shown at weight 600)
- `body_regular`, `body_medium`, `body_semibold` → `typography.custom_body.regular|medium|semibold` (weights 400, 500, 600)
- `code` → `typography.custom_code`

A custom font replaces the family font for its slot, so leave `heading_font`, `body_font`, or `code_font` as they are. The custom body font applies once `body_regular` is uploaded; medium and semibold are optional extra weights.

Custom fonts require Pro.

### Remove a custom font

Set the slot's `url` to `null`, for example `appearance.typography.custom_heading.url`, or `custom_body.regular.url`. That clears the whole slot. To change a custom font, upload a new file.

### Set text spacing

Set `appearance.typography.spacing` to `comfortable` (larger) or `condensed` (smaller). `legacy` is kept for older projects. The dashboard stops offering it once a project moves off it, so confirm before switching away.

## Layout and header

### Choose the layout style

Set `appearance.layout.style` to `classic`, `modern`, `compact`, or `sidebar`. Some header settings only apply in certain layouts:

- Subnav alignment: `compact` and `modern`.
- Subheader layout: `classic` and `modern`.
- Logo size: every layout except `sidebar`.
- In `compact`, the dashboard offers only the right header section and site navigation.

### Turn full width and the sticky header on or off

- `appearance.layout.full_width`: `enabled` stretches pages to the full browser width.
- `appearance.layout.sticky_header`: `true` keeps the header in view while scrolling. `null` follows the preset; Boreal and Hawk turn it on.

### Choose the header style

Set `appearance.header.type`:

- `solid`: the header is filled with the header color, or the primary color.
- `line`: a plain header with a dividing line. Needed for the dark-mode logo and for the `tabs` and `pills` link styles.

`gradient` and `overlay` are deprecated, along with `header.gradient_color` and `header.overlay.*`, which only apply to them.

### Choose the header link style

Set `appearance.header.link_style` to `tabs` or `pills` (animated active indicator). `buttons` is deprecated. It only applies to the line header. Requires Pro.

### Align the header subnav

Set `appearance.header.subnav.alignment` to `start` or `center`. It applies in the `compact` and `modern` layouts.

## Header navigation

### Show or hide built-in sections

Set `appearance.navigation.links.<section>.visibility` to `enabled` or `disabled`. Sections: `home` (the landing page), `guides`, `reference`, `recipes`, `changelog`, `discussions`.

Requires Pro, except `guides`, which only needs a paid plan (Starter or above; not available on Trial). Hiding a section also removes its content from what ReadMe's AI features index.

### Rename built-in sections

Set `appearance.navigation.links.<section>.alias` to the new label, or `null` for the default. Every section except `home` has an alias. Requires Pro.

### Edit header links

Three full arrays hold the header links:

- `appearance.navigation.left` and `right`: the two sides of the top header bar
- `appearance.navigation.sub_nav`: the "Site Navigation" row under the header, next to the built-in sections

Each entry has a `type`, a `title` (`null` uses the default label), a `url`, and a `custom_page`:

- `link_url`: an external link; set `url`
- `custom_page`: a custom page; set `custom_page` to its slug. Entries without a slug are rejected
- `home`, `guides`, `reference`, `recipes`, `changelog`, `discussions`: a built-in section
- `search_box`: the search bar
- `user_controls`: the login and user menu

Requires Pro.

### Choose the first page readers see

Set `appearance.navigation.first_page` to `landing_page`, `documentation` (Guides), or `reference`. When that section is hidden or empty, readers land on the first visible one of Guides, API Reference, Recipes, Changelog, then the landing page. The landing page counts as hidden while `links.home.visibility` is `disabled`.

### Choose where the logo links

Set `appearance.navigation.logo_link` to `homepage` (the company link, `homepage_url` in [general settings](general.md)) or `landing_page`. Set `homepage_url` first when choosing `homepage`. Requires Pro.

### Turn collapsible categories and breadcrumbs on or off

- `appearance.navigation.collapsible_categories`: readers can collapse sidebar categories.
- `appearance.navigation.breadcrumbs`: breadcrumbs above Guides and API Reference pages.

### Turn page icons and the version picker on or off

- `appearance.navigation.page_icons`: icons beside navigation links.
- `appearance.navigation.version`: the version picker in the header.

Requires Pro.

### Choose the subheader layout

Set `appearance.navigation.subheader_layout` to `links` (inline) or `dropdown` (one menu). It applies in the `classic` and `modern` layouts. Requires Pro.

### Choose the classic or unified search modal

Set `appearance.navigation.search_modal`:

- `classic`: results filtered by section tabs, paginated.
- `unified`: search results and Ask AI on one scrolling surface. Ask AI's `in_search` placement only shows here (see [AI settings](ai.md)).

Requires Pro.

## Page display

### Turn the table of contents on or off

Set `appearance.table_of_contents` to `enabled` or `disabled`. It shows on Guides pages. Requires Pro.

### Choose the table of contents style

Set `appearance.toc_variant` to `line` or `dots`.

### Set the changelog layout, author, and date display

- `appearance.changelog.layout`: `collapsed` shows one entry per page; `continuous` shows the whole feed.
- `appearance.changelog.show_author`: shows each entry's author.
- `appearance.changelog.show_exact_date`: `true` shows the date; `false` shows relative time ("3 days ago").

The changelog requires Pro. See [Changelog](https://docs.readme.com/main/docs/changelog).

### Choose the callout icon set

Set `appearance.markdown.callouts.icon_font` to `emojis` or `fontawesome`.

### Rename the "What's Next" section

Set `appearance.whats_next_label` to the heading for the next-steps block at the end of Guides pages. `null` uses "What's Next". Requires Pro.

### Hide the ReadMe logo in the footer

Set `appearance.footer.readme_logo` to `hide`. Requires Enterprise.

## Landing page

The landing page is the site's home page. Turn it on with `appearance.navigation.links.home.visibility: enabled` (Pro), and make it the first page with `navigation.first_page: landing_page`. The landing page requires Pro. See [Landing page](https://docs.readme.com/main/docs/landing-page).

### Edit the landing page hero

Set the fields under `appearance.landing_page.promo`:

- `title` and `text`: the hero heading and paragraph.
- `content_type`: what sits under the text: `none`, `buttons`, `search`, or `html`.
- `html`: the hero markup, used when `content_type` is `html`.
- `button_primary` and `button_secondary`: where each button goes, used when `content_type` is `buttons`. Values: `get-started`, `docs` (Guides), `reference`, `tutorials` (Recipes), `changelog`, `discuss`, or `none`.

### Edit landing page sections

`appearance.landing_page.sections` is a full array of sections shown below the hero, in order. Set the fields a section's `type` uses and `null` for the rest:

- `links`: links to the changelog, docs, and support. No other fields.
- `docs`: pages listed by category; set `page_type` to `Documentation` or `Reference`.
- `text`: `title`, `text`, and `alignment`.
- `text-media`: `title`, `text`, `side` (where the media sits), and `media_type` with its field: `media_html`, `media_image`, or `media_code`.
- `three`: three columns in `group0`, `group1`, and `group2`, each with a `title` and `text`.
- `html`: custom markup in `html`.

`media_image` is a plain image URL, not an `/images/` `uri`. To use an uploaded image, use the `data.url` from the upload response.

## Custom code

Custom code applies to every page for every reader, and ReadMe does not validate it, so confirm the exact code with the user. Set a field to `null` to clear it. See [Custom CSS and JavaScript](https://docs.readme.com/main/docs/custom-css-and-javascript).

### Add custom CSS

Set `appearance.custom_code.css`. It loads after ReadMe's styles, so it can override them. Requires Pro.

### Add custom JavaScript

Set `appearance.custom_code.js`. Broken code can break the site for readers. Requires Enterprise.

### Add custom HTML to the head and page footer

- `appearance.custom_code.html.header`: added to `<head>`; use it for `<meta>` tags or external stylesheets.
- `appearance.custom_code.html.page_footer`: added before `</body>` on every page.

Requires Pro.

### Add custom HTML to the home footer

Set `appearance.custom_code.html.home_footer`. Despite the name, it renders in a `<footer>` element on every page. Requires Enterprise.
