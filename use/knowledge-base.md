# AstrBot 知识库

> [!TIP]
> 需要 AstrBot 版本 >= 3.5.13，并且 WebUI 已经同步升级至最新版本。

## 简介

AstrBot 提供了开箱即用的知识库功能。

## 安装

为了保证主线依赖的精简性，AstrBot 的知识库能力采用插件的形式提供，您需要先安装插件。

前往 WebUI，点击 `知识库` 即可进入到知识库页面。

如果显示未安装知识库，请先安装知识库插件。点击安装按钮即可，或者前往插件市场安装 `astrbot_plugin_knowledge_base` 插件。可能需要安装数分钟，请耐心等待，如果安装过程中发生了错误，请提交 Issue 至 [AstrBot Issues](https://github.com/AstrBotDevs/AstrBot/issues)。

## 配置嵌入模型

打开服务提供商页面，点击新增服务提供商，选择 Embedding，如下图所示：

![](../source/images/knowledge-base/QQ_1748619486233.png)

目前 AstrBot 仅支持兼容 OpenAI API 的嵌入向量服务，如 OpenAI、Ollama 等。

点击上面的提供商卡片进入配置页面，填写配置。

> [!TIP]
> 请再三确保您所填写的**模型名称**和**嵌入维度**是否正确！常见的维度大小有：768, 1024, 1536, 3072。

配置完成后，点击保存。

## 配置重排序模型（可选）

重排序模型可以一定程度上提高最终召回结果的精度。和嵌入模型的配置类似，打开服务提供商页面，点击新增服务提供商，选择重排序。有关重排序模型的更多信息请参考网络。

## 创建知识库

AstrBot 支持多知识库管理。在聊天时，您可以**自由指定知识库**。

进入知识库页面，点击创建知识库，如下图所示：

![](../source/images/knowledge-base/image.png)

填写相关信息。在嵌入模型下拉菜单中您将看到刚刚创建好的嵌入模型和重排序模型（重排序模型可选）。

> [!TIP]
> 一旦选择了一个知识库的嵌入模型，请不要再修改该提供商的**模型**或者**向量维度信息**，否则将**严重影响**该知识库的召回率甚至**报错**。

## 上传文件

点击创建完成的知识库，如下图所示：

![](../source/images/knowledge-base/image-1.png)

您可以上传文件或者通过 URL 来将信息导入到知识库。

### 从文件

数据源选择上传文件，拖拽或者点击上传您想要导入的文件。**最大的单个上传文件大小暂时为 128 MB。**

> [!TIP]
> AstrBot 知识库使用 Markitdown 来将非文本文件转换成大模型友好的 Markdown 格式。
> 您可以上传的文件格式如下：md, txt, docx, xlsx, pptx 等等。其中，兼容性最好的方案是 md 和 txt。

点击上传到知识库即可开始上传。对于大文件，这可能需要一些时间。如果有报错并且无法解决，请提交 Issue 至 [AstrBot Issues](https://github.com/AstrBotDevs/AstrBot/issues)。

上传成功后，下方会弹出绿色的提示。

### 从 URL

> [!TIP]
> 您需要先前往插件市场安装 astrbot_plugin_url_2_knowledge_base 并根据插件文档内的指示完成 playwright 安装后才可使用本功能。

输入网页 URL，即可导入。如果有报错并且无法解决，请提交 Issue 至 [AstrBot Issues](https://github.com/AstrBotDevs/AstrBot/issues)。

上传成功后，下方会弹出绿色的提示。

## 测试和使用

您可以点击 `搜索内容` 立刻开始测试可用性（不会使用 LLM）。

您可在配置页选择需要使用的知识库。

## 反馈

这是一个新功能。如果有报错并且无法解决，请提交 Issue 至 [AstrBot Issues](https://github.com/AstrBotDevs/AstrBot/issues)。

## 附录 1：Credits

1. AstrBot 知识库插件仓库地址：[astrbot_plugin_knowledge_base](https://github.com/lxfight/astrbot_plugin_knowledge_base)
2. Made with ❤ by **[@lxfight](https://github.com/lxfight)** and [@Soulter](https://github.com/Soulter) and [@Yxiguan](https://github.com/Yxiguan) and [@TheAnyan](https://github.com/TheAnyan).
