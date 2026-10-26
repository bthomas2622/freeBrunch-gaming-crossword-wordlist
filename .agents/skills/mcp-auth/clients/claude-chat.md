# Claude Chat connection

Applies to the Chat interface in the Claude Desktop App AND claude code cloud agents. For Claude Code (CLI or the desktop Code tab) refer to `./claude-code.md` instead.

*Note: claude.ai web is not supported - it does not allow setting headers on the MCP connector, so the ReadMe API key cannot be configured. Use the Claude Desktop App or Claude Code instead.*

## Install the ReadMe Plugin

*Note: Only do this if the user does not already have the ReadMe plugin available.*

The user can install the ReadMe plugin via UI by following these steps:

1. Navigate to Plugins from Customize -> Plugins and select the "Add" button, select "Add Marketplace"
2. From the pop-up menu, select "Add from a Repository" and paste in the official Readme agent plugins repository: https://github.com/readmeio/agent-plugins
3. Select "Sync Automatically" (optional, this keeps your plugin up to date with our latest changes) and select "Sync"
4. Navigate back to Plugins and search for "ReadMe" and click on the "ReadMe" result with "yours" on it. Once inside, click the "Add" button.

### Confirmation

Confirm that the ReadMe plugin is installed and that its skills are available.

## Install the MCP Server

The user must manually connect to the MCP server via the "Connector" tab on the plugin - select it, and click on the "Connect" button.

1. On the pop-up menu select "Continue"
2. For Authentication, leave it as "No sign-in"
  1. If the user has a ReadMe API key they should click on the "Add Header", select "authorization" as the header type, and have value `Bearer YOUR_README_API_KEY` using their actual API key. The user can access this key via **Settings → API Keys** in their ReadMe project.
3. Leave the Advanced settings as they are (should be streamable HTTP)
4. Click "Add" to finish

*NOTE: For first-time setup on ReadMe, the user may be creating a new project. If they are, they will not yet have their API key. In that case leave the header out and when the user creates their project they must re-configure the connector with the actual API key.*

*Note: Claude does not expose a way to edit the MCP settings after originally configuring them - the user must remove and re-add the connector to change their API key.*

### Confirmation

Ensure that the MCP server is visible and that you can run tools to verify that the step has been successfully completed.

## Before merge

- **NEEDS_INPUT — UI:** Add the install/settings link, plan/admin restrictions, and reconnect steps.
