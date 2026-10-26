# Cursor connection

Applies to the Cursor IDE, Cursor web, and the Cursor CLI (`agent`). A plugin installed at user scope in any one is available in the others. Install the plugin once. Cursor web follows the same steps as the Cursor UI below.

## Install the ReadMe Plugin

*Note: Only do this if the user does not already have the ReadMe plugin available.*

### Cursor UI

1. Open **Customize** in the sidebar.
2. Search for **ReadMe**.
3. Find the "Readme" plugin with author "ReadMe" and select **Add**.
4. If the user is working on an existing project (they may be setting up a new project for the first time) set the **ReadMe API key** when prompted - this can be left blank for the moment. The user can acess this key via **Settings → API Keys** in their ReadMe project. 
  1. It can be set later by navigating to the ReadMe plugin in the UI and selecting **Configure**.

*NOTE: For first-time setup on ReadMe, the user may be creating a new project. If they are, they will not yet have their API key. In that case leave the api key as a placeholder and when the user creates their project the user/you can modify the configuration with the actual API key.*

In the IDE chat, running the command `/add-plugin readme` will also do the same.

### Cursor CLI - `agent` (Not recommended)

The ReadMe plugin can be installed from a running `agent` session - this must be performed by an agent.

1. Start `agent`
2. Run the `/plugin` slash command
3. Cycle to the "Marketplace" for the installed plugins
4. Search for "readme"
5. Select "ReadMe" from the Cursor Plugin Marketplace
  1. Here you can select to install for yourself (user scope) or for the project you are in (project scope). If you are working in a BiDi synced repository, it is recommended to use project scope, but for MCP it is best to use the user scope.
6. You must configure your API key via the Cursor Application - the agent does not expose any way to add environment keys to config. This is why this configuration method is not recommended.

### Confirmation

Confirm that the ReadMe plugin is installed, that its skills are available, and that you can list tools from its MCP server. The user may need to reload the window or start a new session before the install is recognized.
