# 接入 Kook

> [!TIP]
> AstrBot 未自带这个适配器，需要安装 [astrbot_plugin_kook_adapter](https://github.com/wuyan1003/astrbot_plugin_kook_adapter) 插件。该插件由 [wuyan1003](https://github.com/wuyan1003) 开发 ❤️。
> **如果您觉得有帮助，请支持开发者，给该仓库点一个 Star。**

## 安装 astrbot_plugin_kook_adapter 插件

进入 AstrBot 仪表盘的插件市场，搜索 `astrbot_plugin_kook_adapter`，点击安装。

![image](/source/images/kook/image.png)

安装完成后，前往 消息平台 → 新增适配器 → 选择 Kook（若选项缺失，尝试重启 AstrBot 或检查插件安装状态）。

在弹出的配置对话框中点击 `启用`。

## 在 Kook 创建机器人

1. 点击跳转 [Kook 开发者平台](https://developer.kookapp.cn/app) ，完成以下步骤：  
  1. 登录账号并完成实名认证；  
  2. 点击「新建应用」，自定义 Bot 昵称；  
  3. 进入应用后台，选择「机器人」模块，开启 **WebSocket 连接模式**；  
  4. 复制生成的 **Token**，填入 AstrBot 适配器的对应字段，并点击 `启用`。

![image](/source/images/kook/image-1.png)

2. 点击右下角 `保存` 以新建适配器。
3. 在左边栏「机器人」页面下点击「邀请链接」，设置角色权限（建议赋予全权限，确保功能完整）。
4. 设置好角色权限后，点击上方邀请链接的复制按钮复制链接，打开这个链接，将机器人加入到所需的服务器。
5. 在服务器频道中，@ 刚刚创建的机器人，输入 `/help`，如果成功回复，则测试成功。

## 问题提交

如有疑问，请提交 issue 至[插件仓库](https://github.com/wuyan1003/astrbot_plugin_kook_adapter/issues) 以及 [AstrBot 仓库](https://github.com/AstrBotDevs/AstrBot/issues/new?template=bug-report.yml)。

**如果您觉得有帮助，请支持开发者，给 [astrbot_plugin_kook_adapter](https://github.com/wuyan1003/astrbot_plugin_kook_adapter) 仓库点一个 Star。**
