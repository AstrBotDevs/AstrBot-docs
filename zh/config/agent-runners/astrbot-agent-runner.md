# 内置 Agent 执行器

默认情况下，AstrBot 内置 Agent 执行器为默认执行器，您不用进行任何配置，即可使用 AstrBot 的强大的内置 Agent 执行器。

![image](https://files.astrbot.app/docs/source/images/astrbot-agent-runner/image.png)

在内置 Agent 执行器下，您可以使用 AstrBot 的 [MCP 服务器](/use/mcp)、[知识库](/use/knowledge-base)、[网页搜索](/use/websearch)、人格功能。

## 后续消息处理

当 Agent 正在执行工具调用（如网页搜索、代码执行等）时，用户发送的新消息会被自动捕获并排队。这些后续消息会在下一次工具结果返回时被注入到上下文中，让 LLM 能够优先处理这些消息。

这一特性使得用户可以在 Agent 执行长时间任务时继续对话，而无需等待当前任务完成。Agent 会在处理完当前工具调用后，立即响应您的后续消息。

**使用场景示例：**

- Agent 正在执行网页搜索时，您可以发送"顺便也搜索一下 XXX"
- Agent 正在调用代码执行器时，您可以补充新的指令或修改需求
- 多条后续消息会按发送顺序依次处理