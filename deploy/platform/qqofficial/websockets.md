
# 通过 QQ官方机器人 接入 QQ (Websockets)

## 申请一个机器人

> [!WARNING]
>
> 1. 截至目前，QQ 官方机器人需要设置 IP 白名单。
> 2. 支持群聊、私聊、频道聊天、频道私聊。
>
> 由于腾讯即将终止对 Websockets 接入的支持，目前不再推荐使用此方式部署机器人，请使用 [Webhook](/deploy/platform/qqofficial/webhook) 方式。

首先，打开 [QQ官方机器人](https://q.qq.com) 并登录。

然后，点击创建机器人，填写名称、简介、头像等信息。然后点击下一步、提交审核。等待安全校验通过后，创建成功。

点击创建好的机器人，然后你将会被导航到机器人的管理页面。如下图所示：

![](../../../source/images/qqofficial/image.png)

## 允许机器人加入频道/群/私聊

点击`沙箱配置`，这允许你立即设置一个沙箱频道/QQ群/QQ私聊，用于拉入机器人（需要小于等于20个人）。

然后你将会看到 QQ 群配置、消息列表配置和 QQ 频道配置。根据你的需求来选择QQ群、允许私聊的QQ号、QQ频道。

![](../../../source/images/qqofficial/image-1.png)

## 获取 appid、secret

添加机器人到你想用的地方后。

点击 `开发->开发设置`，找到 appid、secret。复制并保存它们。

## 添加 IP 白名单

点击 `开发->开发设置`，找到 IP 白名单。添加你的服务器 IP 地址。

![](../../../source/images/qqofficial/image-3.png)

> [!TIP]
> 如果你不知道你的服务器 IP 地址，可以在终端中输入 `curl ifconfig.me` 来获取。或者登录 [ip138.com](https://ip138.com/) 查看。
>
> 如果你在没有公网 IP 的环境下，你看到的 IP 是运营商 NAT 的 IP，这个 IP 根据你的运营商的情况可能会随时变化。如有必要，可以配置代理。

## 在 AstrBot 配置

1. 进入 AstrBot 的管理面板
2. 点击左边栏 `机器人`
3. 然后在右边的界面中，点击 `+ 创建机器人`
4. 选择 `qq_official`

弹出的配置项填写：

- ID(id)：随意填写，用于区分不同的消息平台实例。
- 启用(enable): 勾选。
- appid: QQ 官方机器人中获取的 appid。
- secret: QQ 官方机器人中获取的 secret。

点击 `保存`。

## 🎉 大功告成

此时，你的 AstrBot 和 NapCatQQ 应该已经连接成功。使用 `私聊` 的方式在 QQ 对机器人发送 `/help` 以检查是否连接成功。
