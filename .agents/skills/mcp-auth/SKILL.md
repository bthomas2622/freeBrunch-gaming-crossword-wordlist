---
name: mcp-auth
description: Configure authentication with ReadMe to manage documentation hosted on ReadMe. Use during first time setup, or when a project operation is rejected for missing, invalid, expired, or unresolved authentication.
---

# Recover ReadMe MCP authentication

## Workflow

1. **Classify.** Capture the failing operation and non-secret error response. Check whether the response actually indicates missing/rejected credentials rather than validation, insufficient permissions, plan restrictions, or a service outage.
   **Done:** There is an authentication failure to repair, or the error is handed back to its owning workflow.
2. **Identify the environment.** Establish the client that you are running in (for example Claude Code versus Claude Desktop Chat). Commonly you will have information available about the client and surface that you are running in; ask if unclear. Read only the matching [client connection reference](CLIENTS.md).
   **Done:** You understand what client you are running in, and have rea the client connection reference for that client.
3. **Setup.** If you have the API key already in the chat for the project the user is attempting to modify, and the client is one that you can update settings for without user's intervention then setup the connection yourself. Otherwise Direct the user to the intended ReadMe project's **Settings → API Keys** to get their API key (if you have the link to their documentation page, this is accessed by adding "#/settings/api-keys" to any url in that domain). If the client is one where you can configure the MCP configuration yourself, offer to setup the environment if they give you the API key, and tell them that they can setup the configuration themselves and give them the steps to do so.
   **Done:** The user confirms the credential is configured, or you have setup yourself.
4. **Verify and resume.** Use the `https://api.readme.com/v2/projects/me` endpoint via the MCP's `execute-request` to determine whether the correct project has been authenticated. After this, resume with the original operations that the user was attempting to do.
   **Done:** The intended project is reachable and the original workflow resumes, or the unresolved error is reported without repeated guesses.

## First time account setup

New accounts and projects are created through the `setup-project` skill - follow it rather than creating an account from here. If the user has an existing account, they must create their project via the UI and provide the API Key.

## Authentication scope

ReadMe API keys are scoped to a single project only. To edit multiple projects, it is recommended that you set up multiple MCP clients under different names - ie "docs-projectNameA", "docs-projectNameB" and set these up with their individual, project-based API keys.

ReadMe does not currently offer OAuth via MCP.

## Cloud Agents

If you are running in a cloud or remote sandbox (e.g. Claude Code on the web, Codex cloud, Cursor background agents), do not install plugins or write MCP config inside the sandbox. It is temporary and is not the user's app config. Direct the user to configure the plugin/connector and API key through the app's own settings, then follow the UI steps in the matching client reference.
