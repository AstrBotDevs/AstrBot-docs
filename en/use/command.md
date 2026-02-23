# Built-in Commands

AstrBot has many built-in commands that are imported as plugins. They are located in the `packages/astrbot` directory.

Use `/help` to view all built-in commands.

## Common Commands

### /stop

Stops the currently running Agent task in the current session.

When the Agent is executing multi-turn tool calls or generating a long response, you can use this command to interrupt the execution. After interruption, any partially generated content will be preserved.

**Use Cases:**
- The Agent is executing a complex tool call chain and needs to be terminated early
- The model is taking too long to generate a response and needs to be interrupted
- You need to start a new conversation

**Example:**
```
/stop
```

After execution, the number of stopped tasks will be returned.
