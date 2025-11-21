
# 通过 WeChatPadPro 接入微信

**需要 AstrBot 版本 >= 3.5.10**

> [!NOTE]
>
> 1. 这个接入方式不受微信官方支持，请注意风险。**我们建议使用受微信官方支持的方式，即使用企业微信、微信客服、微信公众号方式接入**。请控制聊天频率。如果过于频繁使用（同一时间发送消息次数过多），可能会导致更高的风控风险，请注意使用频率。

## 部署 WeChatPadPro

> [!TIP]
>
> 1. 微信限制，需要手动扫码登录
> 2. 微信限制一个微信号必须**有一台手机在线**才能登录其他端。因此，你需要有一台手机登录该微信，才能使用该接入方式。请尽量保证手机和部署地设备处于同一城市。

有两种部署方式：

- 不通过 Docker 部署
- 通过 Docker 部署

### 不通过 Docker 部署

打开 [WeChatPadPro](https://github.com/luolin-ai/WeChatPadPro)，请按照其 README 提供的部署方式部署。一般来说，最终你会部署一下三个软件：

- MySQL
- Redis
- WeChatPadPro

并且可以通过 `http://ip:port`（ip 是 localhost 或你的公网 IP；port 是 `asset/setting.json` 中你定义的 `port` 中的端口号）打开 WeChatPadPro 的如下 API 接口页面：

![image](/source/images/wechatpadpro/image.png)

AstrBot 的成功接入依赖于您是否能够打开这个页面。

### 通过 Docker 部署

仅在 Linux 上测试了部署的成功性。

> [!TIP]
> 不支持 `arm64` 架构的设备。

```bash
git clone https://github.com/bclz-wyz/WeChatPadPro-Docker --depth 1
```

你可以根据你的需要，编辑 `main/assets/setting.json` 文件，也可以不编辑。建议将 `adminKey` 修改为更安全的密码。

接下来，运行容器。

```bash
docker compose up -d && docker logs wechatpadpro
```

正常情况下，会出现如下日志：

```txt
版本号: v20250515.00
WeChatPadPro
🚀 基于 WeChat Pad 协议的高级微信管理工具 🚀
...
...
如有任何问题或建议，欢迎通过 GitHub Issues 或邮件与我们联系。
======== ADMIN_KEY === ****** ========
connect MySQL success
auto create MySQL tables success
connect Redis success
updateApiVersion success
```

如果你发现出现了报错：

![failed to connect MySQL: dial tcp xxx:3306: connect: connection refused](/source/images/wechatpadpro/image-2.png)

这是因为 MySQL 容器还没有启动成功。

请执行 `docker ps` 查看另外两个容器 `wx_redis` 和 `wx_mysql` 是否 healthy。

![image](/source/images/wechatpadpro/image-3.png)

在 healthy 后，重启 `wechatpadpro` 容器：

```bash
docker restart wechatpadpro
```

## 接入 AstrBot

成功部署后，进入 AstrBot WebUI:

打开机器人 -> `+ 创建机器人` -> wechatpadpro(微信)。

![image](/source/images/wechatpadpro/image-4.png)

- admin_key: 上面步骤中，`setting.json` 下的 `adminKey` 的值。
- host 和 port：取决于你的部署情况。host 填写部署 WeChatPadPro 项目的机器的主机地址。port 填写 `setting.json` 中的 port。如果是 WeChatPadPro-Docker 部署，默认映射到了 38849 端口，如您没修改，填写这个端口即可。

填写完成后，点击保存。

进入`控制台`，查看日志，如果连接成功，会出现如下日志：

```
 [12:50:16] [Core] [INFO] [wechatpadpro.wechatpadpro_adapter:69]: WeChatPadPro 设备不在线或无可用凭据，开始扫码登录流程。 
 [12:50:16] [Core] [INFO] [wechatpadpro.wechatpadpro_adapter:189]: 成功获取授权码 
 [12:50:16] [Core] [INFO] [wechatpadpro.wechatpadpro_adapter:81]: 请扫描以下二维码登录: https://api.pwmqr.com/qrcode/create/?url=http://weixin.qq.com/x/xxx
 [12:50:16] [Core] [INFO] [wechatpadpro.wechatpadpro_adapter:251]: 请在 30 秒内扫码登录！！！ 
```

请打开微信扫码即可，如果超出了 30 秒，重新关开这个平台适配器即可：

![image](/source/images/wechatpadpro/image-5.png)

> [!WARNING]
> **在第一次掉线之后请务必执行以下工作流程，否则将会严重提高风控风险。**
>
> 1. 进入 WechatPadPro 的 API 接口界面，将你刚刚扫码登录的账号的 token 填入 “TOKEN_KEY”，在 ADMIN_KEY 处输入自己设置的密钥。然后点击“连接”。
> 2. 然后往下翻找到“登录”——>”唤醒登录（只限扫码登陆）“，点击 ”Try it out“，再点击 ”Execute“。此时，您扫码的那台机器会弹出登录界面。这个时候就能实现老设备登录不会触发风控。
>
> Token Key 即授权码，获取方式如下：
>
> 打开 AstrBot 数据目录（AstrBot/data 目录），找到 `wechatpadpro_credentials.json` 文件，打开之后，其中的 `auth_key` 即为对应 `wxid` 的授权码。
>
> 如果有任何疑问，请在 [#1586](https://github.com/AstrBotDevs/AstrBot/issues/1586#issuecomment-2889426078) 下提问和得到解答。

## 社区教程

如果上面的教程不够详细，您可以参考以下社区教程：

- [用 AstrBot 框架，实现 QQ 个人号机器人](https://www.robin.xin/archives/astrbot%26wechat%26qq)

## 常见问题

### 接收不到消息

1. 检查 WeChatPadPro 是否正常启动
2. 检查 AstrBot WebUI 控制台日志，是否有与 WeChatPadPro 相关的报错
3. 如果一切无误，请尝试在平台适配器配置中启用 `是否启用主动消息轮询`
