---
name: edit-page-content
description: Create or edit documentation pages in ReadMe, including guides, API reference prose, changelogs, discussions, recipes, and custom pages.
---

# Edit ReadMe page content

## Workflow

1. **Target + Method.** Unless the user has specified directly to you, use the `managing-readme-docs` skill to understand whether you are using MCP or BiDi Sync to make changes, ensure you are working on the right project and targeting the right branch. Identify the page type and whether this is a new page or an edit; use the page-type table below for paths and scope.
   **Done:** The project, write surface, section, page identity, and applicable branch are explicit.
2. **Locate and read.** For updates, read relevant files by searching and finding.
   For MCP use the `/v2/search` endpoint via `execute-request` and if search is insufficient, retrieve categories for the section (`v2/branches/{branch}/categories/{section}`) then pages within categories (`/v2/branches/{branch}/categories/{section}/{title}/pages`)
   **Done:** The exact page and full current body/metadata are available, or the new page's category and slug are agreed.
3. **Draft** Ensure that you have a strong idea of what the user wants, and what you can use in the page. Refer to the [ReadMe docs mdx page](https://docs.readme.com/main/docs/mdx.md) to understand how to write valid MDX. A good page uses components wherever they make the content easier to read: look for places each one fits, but never force one onto content that doesn't suit it. Follow [COMPONENTS.md](COMPONENTS.md) for when to use each built-in component and how to format it, and use reusable content where it fits (see below). Apply the page-type concerns below.
4. **Write**:
   - Use available tools to update content
   - For MCP when creating MDX you MUST apply your changes in full
   **Done:** changes successfully applied
5. **Verify.** Fetch content if using MCP, or check git status for local documentation
   **Done:** The saved result match your applied changes.

## Components and reusable content

| Type | What it is | Docs |
| --- | --- | --- |
| Built-in components | Available in every project: Tabs, Accordion, Cards, and Columns, plus callouts, tabbed code blocks, images, and embeds | [Built-in components](https://docs.readme.com/main/docs/built-in-components.md); best practices in [COMPONENTS.md](COMPONENTS.md) |
| Custom components | JSX components a project defines under **Settings → Custom Components**, or adds from the component marketplace. Used in pages by tag name, like built-ins. Pro and Enterprise plans only | [Custom components](https://docs.readme.com/main/docs/building-custom-mdx-components.md) |
| Reusable content | Named Markdown blocks managed under **Editor → Reusable Content**. Editing a block updates every page that uses it. Pro and Enterprise plans only | [Reusable content](https://docs.readme.com/main/docs/reusable-content.md) |

- Prefer an existing component or reusable block over raw HTML or content copied between pages.
- There is no way for you as an agent to make custom components/reusable components yet - the user must make them on their ReadMe docs site.
- Never invent custom component or reusable block names. Only use ones already present in the project's pages, or ones the user names. If unsure, ask.
- Editing a page that contains a reusable block does not change the block. Changes to the block itself happen in the Reusable Content editor in the user's docs site.
- If the user wants a new custom component or reusable block, give them instructions for how to do this and direct them to their ReadMe docs site.

## Page Types and linking

Unless the site already uses an alternative linking style for intra-project links (same subdomain), prefer root-relative `/section/{slug}` links with descriptive text: `[Authentication](/docs/authentication)`. Use full URLs for external sites or canonical page URLs.

| Page type | Authoring concern | Preferred path | URI alternative |
| --- | --- | --- | --- |
| Guides | Narrative docs organized into categories | `/docs/{slug}` | `doc:{slug}` |
| API reference | Prose pages or endpoint descriptions; distinguish from spec changes | `/reference/{slug}` | `ref:{slug}` |
| Changelogs | Release notes and publication state | `/changelog/{slug}` | `changelog:{slug}` |
| Custom pages | Standalone content that does not fit well into other sections - ie marketing content, announcement pages | `/page/{slug}` | — |
| Recipes | Step-by-step code walkthroughs | `/recipes/{slug}` | — |
| Discussions | Discussions and replies | `/discuss/{id}` | — |

Recipes and discussions use path links, not URI shorthand; `discuss:{id}` does not work. Discussion paths use the topic ID, e.g. `/discuss/6a869f581a29b3127d3ab2d2`.

Slugs are flat: parent/child sidebar relationships never add URL segments. Prefer the slug used in URLs returned by ReadMe when available.

Heading anchors derive from heading text using GitHub-style rules, e.g. `Creating your first guide` → `#creating-your-first-guide`. You will not be able to see anchors on pages by reading them - so apply github-style rules on any headings you see to create anchor links.

For endpoint definition changes, identify the authoritative OpenAPI source and follow [OpenAPI management](https://docs.readme.com/main/docs/openapi-upload-and-management.md); keep these separate from prose edits.

## Documentation Best Practices (helpful resources)

ReadMe's docs on [creating and managing guides](https://docs.readme.com/main/docs/creating-and-managing-guides.md
) contains useful information and best practices for all documentation types.
ReadMe's docs on [BiDi sync](https://docs.readme.com/main/docs/bi-directional-sync)

