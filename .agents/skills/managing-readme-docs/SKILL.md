---
name: managing-readme-docs
description: Shared reference for working on a ReadMe project, covering MCP routing, project sections, Git-backed docs (BiDi Sync), and confirming the active project and branch. Use before reading or changing documentation hosted on ReadMe.
---

# Working on a ReadMe project

Shared reference for project operations. Read the sections needed by the current workflow.

## MCP routing

Use [ReadMe's MCP server](https://docs.readme.com/main/docs/readmes-mcp-server) and its `execute-request` tool to read and maintain documentation hosted on ReadMe.

Use the MCP-server exposed `list-specs`, `list-endpoints`, `get-endpoint` and `search-endpoints` tools to search and understand the operations that can be performed on your documentation via the MCP server. These discovery tools describe ReadMe's APIs, not your endpoints/API reference hosted at ReadMe.

The `fetch` and `search` tools can be used to read through ReadMe's own documentation, hosted ad https://www.docs.readme.com.

Route project analytics separately: page views, search terms, and page quality belong to the `Developer Metrics API` spec, not the `ReadMe API` spec. Discover the available operation and inspect schema before calling endpoints.

## ReadMe Sections

A ReadMe project is organised into sections, and a page belongs to exactly one of them.

- **Guides** — prose documentation: concepts, how-tos, tutorials, onboarding. The main body of most projects, and where content belongs when no other section fits.
- **API Reference** — largely consisting of endpoint ("API") pages (documenting one HTTP method on one endpoint) backed by an OpenAPI definition. The section also holds prose ("API Reference") and webhook pages, which do not include any API schema. API Endpoint pages are commonly created from an uploaded OpenAPI Specification (OAS spec)
- **Changelog** — dated entries announcing releases and changes.
- **Custom pages** — standalone pages outside of other doc sections that generally aren't related to documentation, such as landing or marketing pages.
- **Recipes** — step-by-step code walkthroughs. A recipe is a code sample broken into ordered steps with per-step annotations and line highlighting, not prose with snippets in it. Structured content, edited through its own tooling rather than as markdown.
- **Discussions** — reader-generated community threads and questions.

Do not describe a page as belonging to a section other than the one it is actually in: a guide about a recipe is still a guide.

## Git backed documentation

ReadMe documentation is git-backed, meaning that ReadMe supports:

- Branches and versioning of documentation:
  - Each project has a single "Stable" branch (commonly v1.0, v2.0, ...)
  - By default operations will be applied to the stable branch **unless otherwise specified in a request**
  - Always be cautious when writing to a stable branch - any changes will be immediately visible to users.
  - It is recommended to make changes in branches, then merge branches into stable versions after getting approval for these (ReadMe UI offers an approval process)
- Bi-Directional Synchronization (aka "BiDi Sync") 
  - Users can setup BiDi Sync on a docs repository so that they can make changes to a repository and push those changes, rather than making changes through ReadMe's UI/API/MCP server
  - Configuring BiDi Sync is not supported via MCP and must be done via the UI
  - Github and Gitlab are supported, with BitBucket in beta (contact support)
  - **If you have been instructed to make documentation changes in a docs repository (contains `docs/`, `reference/` etc.) or the user has specified that this is a bi-di synced repository, then make changes via git operations rather than via the MCP server.

## Confirming the active Project

Use the `execute-request` tool to execute a request against the `/v2/projects/me` to get information on the current project. If this project conflicts with what the user is asking for, or if there is an issue connecting to the project use the `mcp-auth` skill to work with the user to setup their project.

If the user is performing first-time setup on ReadMe use the `setup-project` skill.

## Confirm Branch

For branch-scoped work, use the user's explicit target. If none was given, ask whether to use a named/new branch or the project's stable branch, and wait before writing. A ReadMe branch is a product branch/version, not automatically a local Git branch.

Use [ReadMe branches](https://docs.readme.com/main/docs/branches) when choosing or creating a target. Check each operation's scope: project-wide changes are not isolated by selecting a docs branch.

**NEEDS_INPUT — Scope map:** Document which page types and settings are branch-scoped, project-wide, and Git-backed, with canonical documentation links. Confirm changelog and discussion behavior separately.

## Documentation Management Mechanism

If you are in a documentation repository, use git to manage documentation via BiDi Sync unless the user has specified otherwise. Use MCP if you are not in a docs repository.
Note - project settings (styling etc.) must be managed via MCP or via UI, there is no BiDi Sync for these.

Consult the [BiDi Sync](https://docs.readme.com/main/docs/bi-directional-sync) documentation for more information on bi-directional sync.

## Detailed Workflows

Use the following skills to assist the user:

- `edit-page-content`: Understand how to write valid MDX, using custom-components and more for when a user wants to update pages
- `manage-navigation`: How to manage categories, move pages between categories, reorder pages within categories
- `mcp-auth`: How to authenticate with the MCP server and MCP Auth constraints
- `setup-project`: First-time project setup for ReadMe projects
- `update-project-settings`: View and update project-wide settings such as appearance, AI, MCP, SEO, and access
