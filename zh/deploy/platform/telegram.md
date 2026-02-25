# 接入 Telegram

## 支持的基本消息类型

> 版本 v4.15.0。

| 消息类型 | 是否支持接收 | 是否支持发送 | 备注 |
| --- | --- | --- | --- |
| 文本 | 是 | 是 | |
| 图片 | 是 | 是 | |
| 语音 | 是 | 是 | |
| 视频 | 是 | 是 | |
| 文件 | 是 | 是 | |


主动消息推送：支持。

## 更新日志

- **v4.15.0+**: 修复了视频消息发送失败但无明显报错的问题，同时修复了流式回复中视频消息的处理以及话题（Topic）消息回复的元数据问题。

## 1. 创建 Telegram Bot

首先，打开 Telegram，搜索 `BotFather`，点击 `Start`，然后发送 `/newbot`，按照提示输入你的机器人名字和用户名。

创建成功后，`BotFather` 会给你一个 `token`，请妥善保存。

如果需要在群聊中使用，需要关闭Bot的 [Privacy mode](https://core.telegram.org/bots/features#privacy-mode)，对 `BotFather` 发送 `/setprivacy` 命令，然后选择bot， 再选择 `Disable`。

## 2. 配置 AstrBot

1. 进入 AstrBot 的管理面板
2. 点击左边栏 `机器人`
3. 然后在右边的界面中，点击 `+ 创建机器人` 
4. 选择 `telegram`

弹出的配置项填写：

- ID(id)：随意填写，用于区分不同的消息平台实例。
- 启用(enable): 勾选。
- Bot Token: 你的 Telegram 机器人的 `token`。

请确保你的网络环境可以访问 Telegram。你可能需要使用 `配置页->其他配置->HTTP 代理` 来设置代理。