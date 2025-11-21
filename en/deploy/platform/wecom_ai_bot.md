# 接入企业微信智能机器人平台

企业微信智能机器人是企业微信官方推出的 AI 友好的机器人平台，可在单聊或群聊（企业微信内部群）中直接使用，并且支持流式传输。

AstrBot 在 v4.3.5 版本开始支持接入企业微信智能机器人平台。

## 配置智能机器人

1. 登录到[企业微信后台](https://work.weixin.qq.com/wework_admin)。

2. 在左侧导航栏中，点击 `管理工具`，找到 `智能机器人`，点击进入，然后点击创建机器人。

![管理工具-智能机器人](/source/images/wecom_ai_bot/image-1.png)

3. 在创建智能机器人页面下方找到并点击 `API模式创建`。填写机器人名称、头像等基本信息。Token、EncodingAESKey 请点击 `随机获取` 按钮生成。生成之后，先不要点击创建，接下来将配置 AstrBot。

![创建智能机器人账号](/source/images/wecom_ai_bot/image.png)

## 配置 AstrBot

1. 进入 AstrBot 的管理面板，点击左侧栏 `消息平台`，然后在右侧的界面中，点击 `+ 新增适配器`，选择 `企业微信智能机器人`，进入配置页面。

![新增适配器](/source/images/wecom_ai_bot/image-2.png)

2. 在弹出的配置项中将 `企业微信智能机器人的名字`、`token`、`encoding_aes_key` 从上一步创建智能机器人时填写的值复制粘贴到对应的输入框中。ID 可以随意填写，用于区分不同的消息平台实例。`port` 默认为 `6198`，可以根据需要修改，但请确保该端口未被占用。点击 `保存`。

3. 回到企业微信智能机器人创建页面，填写 `URL` 为 `http://IP:port/webhook/wecom-ai-bot`，其中 `IP` 替换为你的 AstrBot 服务器的公网 IP 地址，`port` 替换为上一步填写的端口号。

> 建议有能力的用户自行配置域名和反向代理，并使用 HTTPS 协议。如果没有域名，也可以使用 [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)。

4. 点击 `创建` 按钮，如果一切无误，将进入智能机器人详情页面。如果报错 `服务没有正确响应，请确认后重试`，请检查 AstrBot 的配置、服务器防火墙端口放行规则等。

![创建智能机器人详情页面](/source/images/wecom_ai_bot/image-3.png)

## 使用智能机器人

### 将机器人添加到群聊

在企业微信客户端的企业内部群中，点击添加成员，点击智能机器人，找到刚刚创建的智能机器人，点击添加即可。

![点击添加成员](/source/images/wecom_ai_bot/image-4.png)

![添加成功](/source/images/wecom_ai_bot/image-5.png)

### 使用机器人

在单聊或群聊中，直接发送消息即可与机器人进行对话。

如果您需要类似实时打字机的效果，请确保在 AstrBot 中开启了 `流式回复` 功能。

![流式回复](/source/images/wecom_ai_bot/image-6.png)

## 帮助与支持

如您在配置或使用过程中遇到问题，或需要其他企业支持服务，可发送邮件至 [community@astrbot.app](mailto://community@astrbot.app)。
