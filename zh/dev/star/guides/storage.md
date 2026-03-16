# 插件存储

## 简单 KV 存储

> [!TIP]
> 该功能需要 AstrBot 版本 >= 4.9.2。

插件可以使用 AstrBot 提供的简单 KV 存储功能来存储一些配置信息或临时数据。该存储是基于插件维度的，每个插件有独立的存储空间，互不干扰。

```py
class Main(star.Star):
    @filter.command("hello")
    async def hello(self, event: AstrMessageEvent):
        """Aloha!"""
        await self.put_kv_data("greeted", True)
        greeted = await self.get_kv_data("greeted", False)
        await self.delete_kv_data("greeted")
```


## 存储大文件规范

为了规范插件存储大文件的行为，请将大文件存储于 `data/plugin_data/{plugin_name}/` 目录下。

你可以通过以下代码获取插件数据目录：

```py
from astrbot.core.utils.astrbot_path import get_astrbot_data_path

plugin_data_path = get_astrbot_data_path() / "plugin_data" / self.name # self.name 为插件名称，在 v4.9.2 及以上版本可用，低于此版本请自行指定插件名称
```

## AstrBot 数据目录结构

AstrBot 的数据目录（`data/`）包含以下重要子目录：

| 目录 | 说明 |
|------|------|
| `data/attachments/` | 统一附件存储目录，存放 WebChat 等平台的图片、音频、文件等附件 |
| `data/plugin_data/` | 插件数据存储目录 |
| `data/config/` | 多配置文件存储目录（以 `abconf_` 开头） |
| `data/dist/` | 管理面板前端文件 |
| `data/webchat/imgs/` | （已废弃）旧版 WebChat 图片目录，新版本已迁移至 `attachments/` |

> [!NOTE]
> 如需访问 WebChat 等平台的附件文件，请使用 `data/attachments/` 目录。AstrBot 会自动处理新旧目录的兼容读取。
