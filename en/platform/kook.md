# Connect to KOOK

> [!TIP]
> AstrBot does not include this adapter by default. Install [astrbot_plugin_kook_adapter](https://github.com/wuyan1003/astrbot_plugin_kook_adapter), developed by [wuyan1003](https://github.com/wuyan1003).

## Install `astrbot_plugin_kook_adapter`

In AstrBot Dashboard Plugin Market, search for `astrbot_plugin_kook_adapter` and install it.

![image](https://files.astrbot.app/docs/source/images/kook/image.png)

After installation, go to `Messaging Platforms` -> `Add Adapter` -> `KOOK`.
If KOOK is missing, restart AstrBot or verify plugin installation.

Enable the adapter in the configuration dialog.

## Create a Bot in KOOK

1. Open [KOOK Developer Platform](https://developer.kookapp.cn/app).
2. Sign in and complete identity verification.
3. Create an application and set bot nickname.
4. In the app console, open `Bot` settings and enable **WebSocket connection mode**.
5. Copy the generated **Token** and fill it into the AstrBot adapter.

![image](https://files.astrbot.app/docs/source/images/kook/image-1.png)

6. Click `Save` in AstrBot to create the adapter.
7. In AstrBot `Bots` page, use invite link and set role permissions (full permissions recommended).
8. Use the invite link to add the bot to your target server.
9. In a channel, mention the bot and send `/help` to verify.

## Issue Reporting

If needed, report issues to:

- Plugin repo: <https://github.com/wuyan1003/astrbot_plugin_kook_adapter/issues>
- AstrBot repo: <https://github.com/AstrBotDevs/AstrBot/issues/new?template=bug-report.yml>
