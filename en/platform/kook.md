# Connect to KOOK

1. Go to `Messaging Platforms` → `Add Adapter` → Select `KOOK`.
2. Click the link to open the [KOOK Developer Platform](https://developer.kookapp.cn/app) and complete the following steps:
   1. Sign in and complete identity verification.
   2. Click **New Application** and set a bot nickname.
   3. In the app console, go to the **Bot** module and enable **WebSocket connection mode**.
   4. Copy the generated **Token**, paste it into the corresponding field in the AstrBot adapter, and click `Enable`.

![image](https://files.astrbot.app/docs/source/images/kook/image-1.png)

3. Click `Save` in the bottom-right corner to create the adapter.
4. In AstrBot `Messaging Platforms` page, click **Invite Link**, set role permissions (full permissions recommended to ensure complete functionality).
5. After setting permissions, copy the invite link and open it to add the bot to your target server.
6. In a server channel, mention the bot and send `/sid`. If it replies successfully, the setup is complete.
