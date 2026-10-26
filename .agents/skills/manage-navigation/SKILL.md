---
name: manage-navigation
description: Organize docs side navigation in ReadMe including category management, page management, changing page titles and urls and more.
---

# Manage ReadMe navigation

## Workflow

1. **Target + Method.** Unless the user has specified directly to you, use the `managing-readme-docs` skill to understand whether you are using MCP or BiDi Sync to make changes, ensure you are working on the right project and targeting the right branch. Identify the page type and whether this is a new page or an edit; use the page-type table below for paths and scope.
   **Done:** The project, write surface, section, page identity, and applicable branch are explicit.
2. **Understand How to Manage ReadMe Navigation.** Read through the #readme-navigation-hierarchy section to understand mechanically how ReadMe's site navigation works. To understand best practices around site structure and navigation refer to Readme's [Structuring your docs](https://docs.readme.com/main/docs/structuring-your-docs.md) page.
   **Done:** The affected navigation and its project/branch are known.
3. **Plan.** Show the proposed before/after structure, including page identities, destination categories, order, title versus slug changes, and removals. This should be in a simple to read structure for the user - you don't need to get bogged down in ReadMe's technical concepts. Tree-esque views work well. Check inbound links when URLs change. Explain destructive effects and obtain explicit approval for deletion.
   **Done:** The desired structure and any destructive/URL-changing actions are approved.
4. **Apply.** Depending on the method (local via BiDi Sync or via MCP), make edits.
   **Done:** Every approved structural change has a result, with any partially completed sequence recorded.
5. **Verify.** Re-read over changes and verify against the plan that the user agreed to.
   **Done:** The resulting structure matches the plan or every discrepancy is reported.

## ReadMe Navigation Hierarchy

ReadMe's navigation style is section-dependent. In BiDi synced repositories sections are the folders at root level - ie `docs/` and `reference/`. Refer to the [documentation structure page](https://docs.readme.com/main/docs/documentation-structure) to understand how to structure BiDi git repositories.

### Categories

Categories are not pages - but are the top-level containers that exist in the UI for certain sections. In BiDi synced repositories these correspond to the folders that exist within section folders.

Categories only exist in the guides and API reference sections - and only have a name, no description.

#### Key MCP Operations

- Get all categories in a section - GET https://api.readme.com/v2/branches/{branch}/categories/{section}
- Get all pages in a category - GET https://api.readme.com/v2/branches/{branch}/categories/{section}/{title}/pages

### Guides & API Reference

In the guides (under /docs/{slug}) and API reference (under /reference/{slug}) section all pages must exist under a category. Existing under a category does not mean that it is at the root-level of the category, because pages within these sections can have parent pages.

Parent pages (#empty-vs-non-empty-parent-pages) are normal pages within that category, and to assign a page as the parent of a page set the `parent` on the page as the slug of that page (note that parents must be from the same section) via the create/update endpoint of that section type.

Pages with no `parent` are at the root of the category.

To order pages under a parent page/category:

- For MCP: set the `position` of the page. This is 0-based, and setting to an index that already has a page will push that page, and all pages with a greater index lower.
- For BiDi sync: each folder in `docs/` and `reference/` contains an `order.yml` file that dictates the order. Each .mdx page in the folder must be present in the `order.yml` file without its file extension, in the order you want to show it in:
   ```yml
   - fileNameA
   - fileNameC
   - fileNameB
   ```
   To have the pages in that be ordered A, C, B.

#### Empty vs Non-empty Parent Pages

Empty parent pages, being those with a null/empty `content` in them, act as a dropdown in the UI rather than a page. Clicking them will expand the dropdown and auto-select the first child page under it.

Non-empty parent pages, on click, will select the page and reveal the pages underneath it.

- Guides
- API References

#### Key MCP operations

- Update the position of a guide page (setting its `parent`, `position`, `category`): PATCH https://api.readme.com/v2/branches/{branch}/guides/{slug}
- Update the position of an API reference page (setting its `parent`, `position`, `category`): PATCH https://api.readme.com/v2/branches/{branch}/reference/{slug}
- Create an empty parent guides page (providing no `content`): POST https://api.readme.com/v2/branches/{branch}/guides
- Create an empty parent API Reference page (providing no `content`): POST https://api.readme.com/v2/branches/{branch}/reference

### Recipes

Recipes have a single landing page, and all recipes have a `position` on that page. This is a 0-based position that the recipe appears on the page as.

A single recipe can be set to be the "featured" recipe on the home page, which is shown in a preview, however this must be set in the ReadMe UI.

#### Key MCP Operations

- Update the position of a recipe (setting its `position` attribute) - PATCH https://api.readme.com/v2/branches/{branch}/recipes/{slug}

### Changelogs

Changelogs appear in chronological order, and can only have their order changed by updating the `created_at` date - this is considered the published time.

#### Key MCP Operations

- Update the position of a changelog (setting its `created_at` which is its published datetime) - PATCH https://api.readme.com/v2/changelogs/{identifier}

### Discussions

Discussions are in chronological order and cannot have their position updated.

## Hiding Content

Guides, changelogs, API references and recipes can all be hidden from users by setting `hidden` on the content.

Note that even with a page being hidden, users with the exact URL can still read the content provided they can access the website. Therefore, hiding content is more about hiding the content from the visible side navigation rather than entirely hiding the content.

#### Key MCP Operations

- Any create/update endpoint for relevant sections

### Hiding Categories

To hide a category, it must be empty, or all of its immediate children must have `hidden` of true. Child pages of those pages can be public, and that will still not expose the category in the navigation.

### If a Parent Page is Hidden

If a page has a parent page that is hidden, regardless of whether the child page is public, it will be hidden as well.

## Page Navigation Titles and Icons

The text that is shown in navigation UI for all page sections are the titles of the content themselves (for discussions this is the title that the user sets when asking their question). Therefore it is recommended for all page titles are kept brief for ease of navigation.

Guides and API Reference are the only sections that allow for icons to be set. These icons are any valid "regular" or "duotone" font-awesome icons, or unicode emoji, and appear to the left of the page title in the side navigation. Recipes can have an Emoji that shows at the recipe homepage.

Generally, it is recommended that:

- Guides: pages at category-level use icons, but child pages do not
- API Reference: Don't use icons for a less-busy aesthetic
- Recipes: Use an emoji that best represents the recipe

#### Key MCP Operations

- Any create/update endpoint for relevant sections

