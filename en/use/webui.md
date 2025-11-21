# Admin Panel

The AstrBot admin panel features plugin management, log viewing, visual configuration, statistics viewing, and more.

![image](/source/images/webui/image-4.png)

## Accessing the Admin Panel

After starting AstrBot, you can access the admin panel by visiting `http://localhost:6185` in your browser.

> [!TIP]
> - If you're deploying AstrBot on a cloud server, replace `localhost` with your server's IP address.

## Login

The default username and password are both `astrbot`.

## Visual Configuration

In the admin panel, you can configure AstrBot's plugins through visual configuration. Click `Configuration` in the left sidebar to enter the configuration page.

![image](/source/images/webui/image-3.png)

After modifying the configuration, you need to click the `Save` button in the bottom right corner to successfully save the configuration.

Use the first circular button in the bottom right corner to switch to `Code Edit Configuration`. In `Code Edit Configuration`, you can directly edit the configuration file.

After editing, first click `Apply This Configuration`, which will apply the configuration to the visual configuration, then click the `Save` button in the bottom right corner to save the configuration. If you don't click `Apply This Configuration`, your modifications won't take effect.

![alt text](/source/images/webui/image-5.png)

## Plugins

In the admin panel, you can view installed plugins and install new plugins through the `Plugins` section in the left sidebar.

Click the Plugin Market tab to browse plugins officially listed by AstrBot.

![image](/source/images/webui/image-1.png)

You can also click the + button in the bottom right corner to manually install plugins via URL or file upload.

> Due to the plugin update mechanism, the AstrBot Team cannot fully guarantee the security of plugins in the plugin market. Please carefully verify them. The AstrBot Team is not responsible for any losses caused by plugins.

## Updating the Admin Panel

When AstrBot starts, it automatically checks if the admin panel needs updating. If it does, the first log entry (in yellow) will prompt you.

Use the `/dashboard_update` command to manually update the admin panel (admin command).

Admin panel files are located in the data/dist directory. If you need to manually replace them, download `dist.zip` from https://github.com/AstrBotDevs/AstrBot/releases/ and extract it to the data directory.

## Customizing WebUI Port

Modify the `port` in the `dashboard` configuration in the data/cmd_config.json file.

## Forgot Password

Modify the `password` in the `dashboard` configuration in the data/cmd_config.json file and delete the entire password key-value pair.
