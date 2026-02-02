# Persona

Persona is one of the core features of AstrBot, allowing you to define different identities, personalities, reply styles, and available tools for your bot.

## Persona Management

You can manage all personas through the **Persona Management** page in the AstrBot Control Panel (WebUI).

### Creating a Persona
Click the **Create** button in the top right corner and fill in the following information:
- **Persona ID**: A unique identifier.
- **System Prompt**: Describes the bot's identity and behavioral guidelines.
- **Dialog Pairs**: Preset conversation examples to help the model better understand the settings.
- **Tools**: Tools that this persona can invoke.

### Import and Export
In version 4.12.4, we introduced the import and export functionality for personas, making it easier for users to share and back up their settings.

- **Export**: In the persona card menu, click **Export JSON**. This will download a JSON file containing the persona settings.
- **Import**: Click the **Import** button in the top right corner and select a previously exported JSON file. The system will automatically check for persona ID conflicts.

## Command Management

You can also manage and switch personas through commands in the chat.

- `/persona list`: Lists all personas in a tree structure.
- `/persona <persona_id>`: Switches to the specified persona.
- `/persona view <persona_id>`: Views detailed information about a persona.
