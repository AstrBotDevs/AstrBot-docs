---
outline: deep
---

# 函数调用（Function-calling）

## 简介

函数调用旨在提供大模型**调用外部工具的能力**，以此实现 Agentic 的一些功能。

比如，问大模型：帮我搜索一下关于"猫"的信息，大模型会调用用于搜索的外部工具，比如搜索引擎，然后返回搜索结果。

目前，支持的模型包括但不限于

- gpt-4 系列（效果最好）
- gemini 2.0 系列（不包含 thinking 类的模型）（效果最好）
- deepseek v3(deepseek-chat)
- llama3 系列（本地部署参数量较小时效果不好）

等等。

不支持的模型比较常见的有 deepseek-r1, gemini 2.0 的 thinking 类模型等。

在 AstrBot 中，默认提供了网页搜索、待办提醒、代码执行器这些工具。很多插件，如:

- astrbot_plugin_cloudmusic
- astrbot_plugin_bilibili
- ...

等在提供传统的指令调用的基础上，也提供了函数调用的功能。

相关指令:

- `/tool ls` 查看当前具有的工具列表
- `/tool on` 开启某个工具
- `/tool off` 关闭某个工具
- `/tool off_all` 关闭所有工具

某些模型可能不支持函数调用，会返回诸如 `tool call is not supported`, `function calling is not supported`, `tool use is not supported` 等错误。在大多数情况下，AstrBot 能够检测到这种错误并自动帮您去除函数调用工具。如果你发现某个模型不支持函数调用，也可使用 `/tool off_all` 命令关闭所有工具，然后再次尝试。或者更换为支持函数调用的模型。


下面是一些常见的工具调用 Demo：

![image](https://files.astrbot.app/docs/source/images/function-calling/image.png)

![image](https://files.astrbot.app/docs/source/images/function-calling/image-1.png)


## 工具执行期间的后续消息

当 Agent 正在执行工具调用时，您发送的新消息会被自动捕获并排队。这些后续消息会在下一次工具结果返回时被注入到上下文中，让 LLM 能够优先处理。

例如，当 Agent 正在执行网页搜索时，您可以继续发送"顺便也搜索一下 XXX"，Agent 会在处理完当前搜索后立即响应您的后续请求。

:::tip
此功能仅在使用 AstrBot 内置 Agent 执行器时可用。
:::

## MCP

请前往此文档 [AstrBot - MCP](/use/mcp) 查看。