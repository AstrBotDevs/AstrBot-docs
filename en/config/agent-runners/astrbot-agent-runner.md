# Built-in Agent Runner

By default, AstrBot uses the built-in Agent Runner as the default executor. You don't need to configure anything to use AstrBot's powerful built-in Agent Runner.

![image](https://files.astrbot.app/docs/source/images/astrbot-agent-runner/image.png)

With the built-in Agent Runner, you can use AstrBot's [MCP Server](/use/mcp), [Knowledge Base](/use/knowledge-base), [Web Search](/use/websearch), and persona features.

## Follow-up Message Handling

When the Agent is executing tool calls (such as web search, code execution, etc.), new messages sent by the user are automatically captured and queued. These follow-up messages are injected into the context when the next tool result is returned, allowing the LLM to prioritize them.

This feature allows users to continue the conversation while the Agent is performing long-running tasks, without waiting for the current task to complete. The Agent will respond to your follow-up messages immediately after processing the current tool call.

**Example Use Cases:**

- While the Agent is performing a web search, you can send "also search for XXX"
- While the Agent is calling the code executor, you can add new instructions or modify requirements
- Multiple follow-up messages are processed in the order they were sent