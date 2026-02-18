# 使用 CLI Tester 调试插件

CLI Tester 是一个内置的平台适配器，旨在为插件开发者提供快速的反馈循环。通过 CLI Tester，你可以在不连接任何即时通讯平台（如 QQ、微信等）的情况下，直接在命令行中测试和调试你的插件逻辑。

## 核心价值

- ⚡ **即时反馈**：无需登录 IM 平台，命令行直接发送消息并查看结果。
- 🔄 **快速迭代**：缩短“修改代码 -> 重启 -> 测试”的周期。
- 🎯 **专注开发**：专注于插件逻辑，不受平台交互限制。
- 🧪 **独立测试**：支持并发测试和会话隔离。

## 启用 CLI Tester

1. 进入 AstrBot 管理面板。
2. 导航至 **设置** -> **平台接入**。
3. 找到 **CLI测试器** (Type: `cli`)。
4. 开启 **启用** 开关。
5. 默认配置通常即可使用：
   - **模式**: `socket` (推荐)
   - **Socket 路径**: `/tmp/astrbot.sock`
   - **会话隔离**: `false` (如果需要模拟多用户并发测试可开启)

## 使用方法

### 1. 基础测试

你可以使用容器内的 `astrbot-cli` 工具发送消息：

```bash
# 在 Docker 容器内测试
docker exec -it astrbot python3 /AstrBot/astrbot-cli "你好"

# 测试插件指令
docker exec -it astrbot python3 /AstrBot/astrbot-cli "/help"
```

### 2. 查看富媒体响应

如果你的插件返回了图片等富媒体内容，可以使用 `-j` 参数查看原始 JSON 响应（包含 Base64 编码的图片数据）：

```bash
docker exec -it astrbot python3 /AstrBot/astrbot-cli -j "/time"
```

### 3. 创建宿主机快捷命令（可选）

为了更方便地使用，你可以在宿主机上创建一个包装脚本：

```bash
# 在宿主机执行
cat > /usr/local/bin/astrbot-cli << 'EOF'
#!/bin/bash
docker exec -i astrbot python3 /AstrBot/astrbot-cli "$@"
EOF

chmod +x /usr/local/bin/astrbot-cli

# 现在可以直接在宿主机使用
astrbot-cli "测试消息"
```

## 运行模式

CLI Tester 支持多种运行模式，可在配置中修改：

- **socket** (默认): 通过 Unix Socket 通信，支持并发和结构化响应。
- **tty**: 交互式模式，直接在 AstrBot 运行的终端进行输入输出（不推荐在 Docker 生产环境使用）。
- **file**: 轮询文件模式，通过读取指定文件的内容作为输入。

## 进阶技巧：会话隔离

在配置中开启 `use_isolated_sessions` 后，每个通过 `astrbot-cli` 发送的请求都会被视为一个独立的会话。这对于测试需要上下文记忆的插件或并发场景非常有用。

::: tip 提示
CLI Tester 自动豁免白名单检查，因此你无需担心测试消息被拦截。
:::
