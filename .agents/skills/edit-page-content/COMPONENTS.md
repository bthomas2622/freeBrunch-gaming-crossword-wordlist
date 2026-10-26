# Built-in components and MDX best practices

Best practices for formatting ReadMe pages with built-in components, plus the MDX rules that most often break rendering. For component props, see [Built-in components](https://docs.readme.com/main/docs/built-in-components.md) and [Editor blocks](https://docs.readme.com/main/docs/editor-blocks.md).

## Principles

- A good ReadMe page uses components. Tabs, accordions, cards, and callouts usually make content easier to scan, navigate, and read than the same content written as plain Markdown.
- Look for places they fit. When drafting or restyling, check each section against [Choosing a component](#choosing-a-component). When content matches a component's use case, use the component rather than plain Markdown.
- Don't force them. If content doesn't match any use case, leave it as Markdown; a page of narrative prose may have none. A component that doesn't fit, such as tabs around sequential steps or a callout around ordinary prose, is worse than no component.
- Don't nest components deeply. A page made mostly of nested components is harder to read and maintain.
- When restyling an existing page, change formatting only. Keep wording, code, and link targets exactly as they are unless the user asked for a rewrite, and never drop content.
- Match what the project already does. If other pages use a component a certain way (icons on cards, callout titles), follow that.
- When two components could fit, pick the one that wraps less: Tabs, then Cards, then Accordion, then a callout.

## Choosing a component

| Content | Use |
| --- | --- |
| Pick-one variants of the same task (OS, language, framework, install method, plan, version) | [Tabs](#tabs) |
| The same code in several languages, with no prose per variant | [Tabbed code blocks](#tabbed-code-blocks) |
| FAQs, troubleshooting, known issues, optional or advanced details | [Accordion](#accordion) |
| 3+ links to other pages: next steps, see also, hub or landing pages | [Cards](#cards) |
| A real aside: note, tip, warning, or danger | [Callout](#callouts) |
| Short, parallel reference data | [Table](#tables) |
| Informative or captioned images | [Image](#images) |
| Videos, PDFs, or other external media | [Embed](#embeds) |
| Diagrams that can be expressed as text | [Mermaid](https://docs.readme.com/main/docs/creating-mermaid-diagrams.md) |
| Small side-by-side comparisons | [Columns](#columns) |

## Callouts

Prefer `<Callout>` with a Font Awesome icon. It looks more polished than an emoji. Always set `theme`, because it can't be inferred from a Font Awesome icon:

```mdx
<Callout icon="fa-circle-info" theme="info">
### Good to know

Authentication uses Bearer tokens.
</Callout>
```

| Theme | Suggested icon | Emoji | Use for |
| --- | --- | --- | --- |
| `info` | `fa-circle-info` | 📘 | Context, FYI |
| `okay` | `fa-lightbulb` | 👍 | Tips, suggestions, success states |
| `warn` | `fa-triangle-exclamation` | 🚧 | Caution, limitations |
| `error` | `fa-circle-exclamation` | ❗️ | Danger, breaking changes, things that must not be skipped |

Callouts can also be written as a blockquote whose first line starts with a theme emoji. This form only supports emoji icons:

```md
> 📘 Good to know
>
> Authentication uses Bearer tokens.
```

When the page or project already uses emoji callouts, follow that style instead of mixing the two.

Callouts are the easiest component to overuse:

- Only use a callout for content that is genuinely an aside. Ordinary prose that says "must", "note that", or "remember" stays a paragraph. Boxing normal text in a callout is a defect.
- A plain blockquote with no leading emoji stays a plain blockquote.
- To start a blockquote with an emoji without making it a callout, bold the emoji: `> **👋** Hello`.

## Tabs

Use tabs when the reader wants exactly one of several parallel variants and skips the rest.

Do not use tabs for:

- Sequential sections a reader reads in order, such as two different features or concepts. Keep these as headings. Sections whose bodies have very different structures are usually sequential, not variants.
- Headings that other content links to by anchor. Tabs remove the heading and its anchor, which breaks those links.
- Content already inside a `<Tab>`. Never nest `<Tabs>` inside a `<Tab>`.

Formatting:

- Give every `<Tab>` a short `title`, usually the variant name (`macOS`, `Python`, `npm`).
- Leave a blank line after `<Tab ...>` and before `</Tab>` whenever the tab contains block content (code fences, lists, headings). Without it, a fence renders as literal backticks.
- Do not indent Markdown inside the tab. Four spaces of indentation turns content into a code block.
- Close every code fence before `</Tab>`.

````mdx
<Tabs>
<Tab title="macOS">

```sh
brew install example
```

</Tab>
<Tab title="Windows">

```powershell
winget install example
```

</Tab>
</Tabs>
````

## Tabbed code blocks

For code-only variants, use ReadMe's native code tabs instead of `<Tabs>`. Put the fences directly after each other with no blank line between them, and add a tab title after the language:

````md
```python Python
client = Example(api_key="...")
```
```javascript Node.js
const client = new Example({ apiKey: '...' });
```
````

Use `<Tabs>` instead when each variant also has its own prose. Always set a language on code fences so syntax highlighting works.

## Accordion

Use accordions for content that is reference-like or skippable:

- FAQs, troubleshooting, common errors, known issues: one accordion per entry, titled with the question or error name.
- "Advanced", "Optional", or "Under the hood" subsections.
- Table rows whose descriptions run to several paragraphs. Keep short rows as a table.

Do not hide required steps inside an accordion. Readers skim past collapsed content.

```mdx
<Accordion title="Why am I getting a 401 error?" icon="fa-circle-question">

Check that the API key is sent as a Bearer token.

</Accordion>
```

`icon` is optional and must be a valid Font Awesome icon.

## Cards

Use cards for groups of 3+ links to other pages: "Next steps", "See also", "Related guides", and hub or landing pages that mostly link to children.

```mdx
<Cards>
  <Card title="Authentication" href="/docs/authentication" icon="fa-key">
  Create an API key and send your first authenticated request.
  </Card>
  <Card title="Webhooks" href="/docs/webhooks" icon="fa-bell">
  Receive events when resources change.
  </Card>
  <Card title="Errors" href="/docs/errors" icon="fa-triangle-exclamation">
  Understand error codes and how to handle them.
  </Card>
</Cards>
```

- Use the link text as `title` and the link target as `href`.
- Give each card a short description. When restyling existing content, use the text that is already there; don't make up card bodies.
- Icons are optional. Use them consistently across a group, only with valid Font Awesome names, and only if the page or project already uses icons or the user asks for them.
- A card can omit `href` and hold a list of links instead, when one title groups several related links.
- Other props: `badge` (e.g. `"Beta"`), `kind="tile"` for a compact tile, and `columns` on `<Cards>` to fix the column count.

## Columns

Columns suit small side-by-side comparisons, such as "Invalid" versus "Valid" examples. Use them only for that; longer content in narrow columns is hard to read. Keep existing columns as they are.

```mdx
<Columns layout="auto">
  <Column>
  
  Invalid
  
  </Column>
  <Column>
  
  Valid
  
  </Column>
</Columns>
```

`layout` is `auto` (sized to content) or `fixed` (equal widths).

## Tables

- Use Markdown tables for short, parallel reference data. Keep them as tables rather than converting rows to cards, accordions, or lists.
- Use canonical pipe syntax with a leading and trailing `|` on every row and a delimiter row. Align columns with `:---`, `:---:`, or `---:`.
- Content migrated from other sites sometimes arrives as a flattened table: header cells, then row cells, each on their own line. Rebuild it as a real table with every cell kept verbatim. If the grouping is ambiguous, leave it as is.

## Images

- Use `![alt](url)` for simple images.
- Use `<Image />` when you need a caption, alignment, size, border, or frame:

  ```mdx
  <Image src="https://files.readme.io/example.png" alt="The API key settings page" caption="Settings → API Keys" align="center" />
  ```

- Always write meaningful `alt` text. Only set `caption` when there is a real caption; never invent one, and never fold a caption into `alt`.

## Embeds

```mdx
<Embed title="Getting started" typeOfEmbed="youtube" url="https://www.youtube.com/embed/VIDEO_ID" />
<Embed title="" typeOfEmbed="iframe" url="https://www.loom.com/embed/VIDEO_ID" />
```

- `url` must be an absolute `https://` URL to a real external resource. Never use a relative path, `data:` URI, or inline HTML.
- Use embeddable URL forms. YouTube: `https://www.youtube.com/embed/ID`, not `watch?v=`. Loom: `/embed/ID`, not `/share/ID`. The share forms refuse to load in a frame.
- Use `typeOfEmbed="youtube"` only for YouTube. Use `typeOfEmbed="iframe"` for other video hosts (Vimeo, Wistia, Loom) and generic iframes.
- Always include `title`, even if it is `""`.
- Only embed standalone media. A link in a sentence stays a link.

## MDX rules

ReadMe pages are MDX. See [MDX](https://docs.readme.com/main/docs/mdx.md) and [Troubleshoot MDX errors](https://docs.readme.com/main/docs/rendering-errors-invalid-mdx.md).

- Pick one HTML convention per page and don't mix them. Projects on ReadMe's newer editor accept standard HTML (`class`, `style="..."`, `<br>`, `<!-- -->`). Older projects only accept JSX. Follow what the page or project already uses. If there's nothing to follow, use JSX, which works on both:
  - Close every tag, and self-close void elements: `<br />`, `<img />`, `<hr />`.
  - Use `className` instead of `class`, camelCase attribute names (except `data-` and `aria-`), and style objects: `style={{ marginLeft: 'auto' }}`.
  - Write comments as `{/* comment */}`.
- `{` and `}` start JavaScript expressions. Escape literal braces and stray `<` or `>` in prose (`\{`, `&lt;`), or put them in inline code.
- On older projects, put raw HTML that isn't valid JSX inside ``<HTMLBlock>{`...`}</HTMLBlock>``. `<script>` tags are stripped.
- Leave a blank line between a component tag and block-level Markdown inside it, and don't indent that Markdown.
- Only use built-in components and the project's own custom components. Don't add `import` statements, and don't define reusable JSX with `export` in a page; that belongs in a [custom component](https://docs.readme.com/main/docs/building-custom-mdx-components.md).

## Converting content from other platforms

Components from other documentation websites, when reading the .md versions, do not exist in ReadMe. Convert them and keep the text:

| Source | ReadMe |
| --- | --- |
| `<Note>`, `<Info>`, `:::note`, `:::info` | `info` callout |
| `<Tip>`, `<Check>` | `okay` callout |
| `<Warning>`, `<Caution>`, `:::warning` | `warn` callout |
| `:::danger` | `error` callout |
| `<CodeGroup>` | Tabbed code blocks |
| `<Steps>` | Numbered list, or headings if steps are long |
| `<figure><img><figcaption>` | `<Image>` with `caption` |
| `<YouTube id="...">` and similar video tags, `<iframe>`, `<video>` | `<Embed>` |
| GitBook `{% embed %}` of a normal web page | Plain link |
| Any other unknown tag | Remove the tag, keep its content as Markdown |

Also remove migration artifacts that aren't part of the docs: navigation lists or links scraped above the first heading, self-referencing heading anchors such as `## Setup [#setup]`, and instructions meant only for agents.
