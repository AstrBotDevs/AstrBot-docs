# 接入 Kook

> [!TIP]
> 自 AstrBot v4.18.4 版本起，可直接使用此适配器。该插件曾由 [wuyan1003](https://github.com/wuyan1003) 开发 ❤️，现在插件已迁移到Astrbot仓库中，目前由 [shuiping233](https://github.com/shuiping233) 负责开发和维护工作。
> **如果您觉得有帮助，请支持开发者。**

> [!Warning]
> Kook适配器插件曾经是社区插件，插件市场中的`astrbot_plugin_kook_adapter`插件已经过时并存在诸多bug，请需要使用Kook适配器的用户尽快升级 Astrbot 版本至 v4.18.4 或以上，以便使用最新版本的Kook适配器，

<!-- ## 安装 astrbot_plugin_kook_adapter 插件 -->
<!-- ![image](https://files.astrbot.app/docs/source/images/kook/image.png) -->

## 支持的基本消息类型

> 版本 v4.18.4

| 消息类型     | 是否支持接收 | 是否支持发送 | 备注                                           |
| ------------ | ------------ | ------------ | ---------------------------------------------- |
| 文本         | 是           | 是           | 支持官方[kmarndown]语法                        |
| 图片         | 是           | 是           | 支持外链，图片类型仅支持`jpeg`， `gif`， `png` |
| 语音         | 是           | 是           | 支持外链                                       |
| 视频         | 是           | 是           | 支持外链，视频仅支持`mp4`，`mov`               |
| 文件         | 是           | 是           | 支持外链                                       |
| 卡片（Json） | 是           | 是           | 参见[Kook文档-卡片消息]                        |

主动消息推送：支持  

消息接收模式：WebSocket，Webhook（尚未计划）

## 在 Kook 创建机器人

1. 点击跳转 [Kook 开发者平台] ，完成以下步骤：  
2. 登录账号并完成实名认证；  
3. 点击「新建应用」，自定义 Bot 昵称；  
4. 进入应用后台，选择「机器人」模块，开启 **WebSocket 连接模式**；  
5. 复制生成的 **Token**，填入 AstrBot 适配器的对应字段，并点击 `启用`。
6. 点击右下角 `保存` 以新建适配器。
7. 在左边栏「机器人」页面下点击「邀请链接」，设置角色权限（建议赋予全权限，确保功能完整）。
8. 设置好角色权限后，点击上方邀请链接的复制按钮复制链接，在浏览器中打开复制出来的邀请链接，将机器人加入到所需的服务器。

  ![image](https://files.astrbot.app/docs/source/images/kook/image-1.png)

## 在 AstrBot 配置

1. 进入 AstrBot 的管理面板
2. 点击左边栏 `机器人`
3. 然后在右边的界面中，点击 `+ 创建机器人`
4. 选择 `kook` 适配器

弹出的配置项填写：

- ID(id)：随意填写，用于区分不同的消息平台实例。
- 启用(enable): 勾选。
- 机器人 Token: 填写再 [Kook 开发者平台] 中创建机器人时生成的 Token。

5. 完成适配器配置填写后，点击 `保存`。
6. 最后，在kook服务器频道（若没有属于自己的服务器频道,请先创建一个服务器频道）中，@ 刚刚创建的机器人，输入 `/sid`，如果机器人成功回复，则测试成功。

## 问题提交

如有疑问，请提交 issue 至 [AstrBot 仓库](https://github.com/AstrBotDevs/AstrBot/issues/new?template=bug-report.yml)。

[Kook 开发者平台]: https://developer.kookapp.cn/app
[kmarndown]: https://developer.kookapp.cn/doc/kmarkdown
[Kook文档-卡片消息]: https://developer.kookapp.cn/doc/cardmessage
