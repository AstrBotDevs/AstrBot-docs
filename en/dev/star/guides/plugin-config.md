
# Plugin Configuration

As plugin functionality grows, you may need to define configurations to allow users to customize plugin behavior.

AstrBot provides "powerful" configuration parsing and visualization features. Users can configure plugins directly in the management panel without modifying code.

## Configuration Definition

To register configurations, first add a `_conf_schema.json` JSON file in your plugin directory.

The file content is a `Schema` that represents the configuration. The Schema is in JSON format, for example:

```json
{
  "token": {
    "description": "Bot Token",
    "type": "string",
  },
  "sub_config": {
    "description": "Test nested configuration",
    "type": "object",
    "hint": "xxxx",
    "items": {
      "name": {
        "description": "testsub",
        "type": "string",
        "hint": "xxxx"
      },
      "id": {
        "description": "testsub",
        "type": "int",
        "hint": "xxxx"
      },
      "time": {
        "description": "testsub",
        "type": "int",
        "hint": "xxxx",
        "default": 123
      }
    }
  }
}
```

- `type`: **Required**. The type of the configuration. Supports `string`, `text`, `int`, `float`, `bool`, `object`, `list`. When the type is `text`, it will be visualized as a larger resizable textarea component to accommodate large text.
- `description`: Optional. Description of the configuration. A one-sentence description of the configuration's behavior is recommended.
- `hint`: Optional. Hint information for the configuration, displayed in the question mark button on the right in the image above, shown when hovering over it.
- `obvious_hint`: Optional. Whether the configuration hint should be prominently displayed, like `token` in the image above.
- `default`: Optional. The default value of the configuration. If the user hasn't configured it, the default value will be used. Default values: int is 0, float is 0.0, bool is False, string is "", object is {}, list is [].
- `items`: Optional. If the configuration type is `object`, the `items` field needs to be added. The content of `items` is the sub-Schema of this configuration item. Theoretically, it can be nested infinitely, but excessive nesting is not recommended.
- `invisible`: Optional. Whether the configuration is hidden. Default is `false`. If set to `true`, it will not be displayed in the management panel.
- `options`: Optional. A list, such as `"options": ["chat", "agent", "workflow"]`. Provides dropdown list options.
- `editor_mode`: Optional. Whether to enable code editor mode. Requires AstrBot >= `v3.5.10`. Versions below this won't report errors but won't take effect. Default is false.
- `editor_language`: Optional. The code language for the code editor, defaults to `json`.
- `editor_theme`: Optional. The theme for the code editor. Options are `vs-light` (default) and `vs-dark`.
- `_special`: Optional. Used to call AstrBot's visualization features for provider selection, persona selection, knowledge base selection, etc. See details below.

When the code editor is enabled, it looks like this:

![editor_mode](/source/images/plugin/image-6.png)

![editor_mode_fullscreen](/source/images/plugin/image-7.png)

The **_special** field is only available after v4.0.0. Currently supports `select_provider`, `select_provider_tts`, `select_provider_stt`, `select_persona`, allowing users to quickly select model providers, personas, and other data already configured in the WebUI. Results are all strings. Using select_provider as an example, it will present the following effect:

![image](/source/images/plugin/image.png)

## Using Configuration in Plugins

When loading plugins, AstrBot will check if there's a `_conf_schema.json` file in the plugin directory. If it exists, it will automatically parse the configuration and save it under `data/config/<plugin_name>_config.json` (a configuration file entity created according to the Schema), and pass it to `__init__()` when instantiating the plugin class.

```py
from astrbot.api import AstrBotConfig

@register("config", "Soulter", "A configuration example", "1.0.0")
class ConfigPlugin(Star):
    def __init__(self, context: Context, config: AstrBotConfig): # AstrBotConfig inherits from Dict and has all dictionary methods
        super().__init__(context)
        self.config = config
        print(self.config)

        # Supports direct configuration saving
        # self.config.save_config() # Save configuration
```

## Configuration Updates

If you update the Schema when releasing different versions, note that AstrBot will recursively check the Schema's configuration items. If it finds that a configuration item is missing from the configuration file, it will automatically add the default value. However, AstrBot will not delete **extra** configuration items from the configuration file, even if this configuration item doesn't exist in the new Schema (you deleted this configuration item from the new Schema).
