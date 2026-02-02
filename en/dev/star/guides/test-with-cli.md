# Debugging Plugins with CLI Tester

CLI Tester is a built-in platform adapter designed to provide a fast feedback loop for plugin developers. With CLI Tester, you can test and debug your plugin logic directly from the command line without connecting to any messaging platforms (like QQ, WeChat, etc.).

## Core Values

- ⚡ **Instant Feedback**: No need to log into IM platforms; send messages and see results directly in the terminal.
- 🔄 **Fast Iteration**: Shortens the "edit code -> restart -> test" cycle.
- 🎯 **Focused Development**: Focus on plugin logic without platform interaction overhead.
- 🧪 **Independent Testing**: Supports concurrent testing and session isolation.

## Enabling CLI Tester

1. Go to the AstrBot Management Panel.
2. Navigate to **Settings** -> **Platform Access**.
3. Find **CLI Tester** (Type: `cli`).
4. Toggle the **Enable** switch.
5. The default configuration is usually sufficient:
   - **Mode**: `socket` (Recommended)
   - **Socket Path**: `/tmp/astrbot.sock`
   - **Session Isolation**: `false` (Enable if you need to simulate multi-user concurrent tests)

## Usage

### 1. Basic Testing

You can use the `astrbot-cli` tool inside the container to send messages:

```bash
# Test inside the Docker container
docker exec -it astrbot python3 /AstrBot/astrbot-cli "Hello"

# Test plugin commands
docker exec -it astrbot python3 /AstrBot/astrbot-cli "/help"
```

### 2. Viewing Rich Media Responses

If your plugin returns rich media content like images, you can use the `-j` flag to view the raw JSON response (including Base64 encoded image data):

```bash
docker exec -it astrbot python3 /AstrBot/astrbot-cli -j "/time"
```

### 3. Creating a Host Shortcut (Optional)

For convenience, you can create a wrapper script on your host machine:

```bash
# Execute on the host machine
cat > /usr/local/bin/astrbot-cli << 'EOF'
#!/bin/bash
docker exec -i astrbot python3 /AstrBot/astrbot-cli "$@"
EOF

chmod +x /usr/local/bin/astrbot-cli

# Now you can use it directly on the host
astrbot-cli "Test message"
```

## Running Modes

CLI Tester supports several modes, which can be modified in the configuration:

- **socket** (Default): Communicates via Unix Socket, supporting concurrency and structured responses.
- **tty**: Interactive mode, input/output directly in the terminal where AstrBot is running (not recommended for Docker production environments).
- **file**: File polling mode, reads input from a specified file.

## Advanced: Session Isolation

When `use_isolated_sessions` is enabled in the configuration, every request sent via `astrbot-cli` is treated as an independent session. This is useful for testing plugins that require context memory or for concurrent scenarios.

::: tip NOTE
CLI Tester is automatically exempted from whitelist checks, so you don't have to worry about test messages being blocked.
:::
