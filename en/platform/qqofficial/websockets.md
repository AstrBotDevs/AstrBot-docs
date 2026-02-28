# Connect QQ via QQ Official Bot (Websockets)

## Supported Basic Message Types

> Version v4.15.0.

| Message Type | Receive | Send | Notes |
| --- | --- | --- | --- |
| Text | Yes | Yes | |
| Image | Yes | Yes | |
| Voice | No | No | |
| Video | No | No | |
| File | No | No | |

Proactive message push: Not supported.

## Apply for a Bot

> [!WARNING]
> 1. QQ Official Bot currently requires an IP whitelist.
> 2. It supports group chat, private chat, channel chat, and channel private chat.
> 3. Tencent is phasing out Websockets access, so this method is no longer recommended. Please use [Webhook](/en/platform/qqofficial/webhook) instead.

Open [QQ Official Bot](https://q.qq.com) and sign in.

Create a bot, fill in name/description/avatar, then submit for review. After security verification passes, creation is complete.

Open the created bot to enter its management page:

![image](https://files.astrbot.app/docs/source/images/qqofficial/image.png)

## Allow Bot in Channel / Group / Private Chat

Open `Sandbox Configuration` to set a sandbox channel / QQ group / QQ private chat (up to 20 members).

Then configure QQ groups, private chat QQ accounts, and QQ channels as needed.

![image](https://files.astrbot.app/docs/source/images/qqofficial/image-1.png)

## Get `appid` and `secret`

After adding the bot where you need it, open `Development -> Development Settings`, then copy `appid` and `secret`.

## Add IP Whitelist

Open `Development -> Development Settings`, find IP whitelist, and add your server IP.

![image](https://files.astrbot.app/docs/source/images/qqofficial/image-3.png)

> [!TIP]
> If you do not know your server IP, run `curl ifconfig.me` or check [ip138.com](https://ip138.com/).
>
> In NAT environments without a public IP, the observed IP may change depending on your carrier. Use proxy/tunnel if needed.

## Configure in AstrBot

1. Open AstrBot Dashboard.
2. Click `Bots` in the left sidebar.
3. Click `+ Create Bot`.
4. Select `qq_official`.

Fill in:

- ID (`id`): any unique identifier.
- Enable (`enable`): checked.
- `appid`: from QQ Official Bot platform.
- `secret`: from QQ Official Bot platform.

Click `Save`.

## Done

AstrBot should now be connected. Send `/help` to the bot in QQ private chat to verify.
