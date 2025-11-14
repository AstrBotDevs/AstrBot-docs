# 通过 NapCatQQ 协议实现端接入 QQ

> [!TIP]
>
> - 请合理控制使用频率。过于频繁地发送消息可能会被判定为异常行为，增加触发风控机制的风险。
> - 本项目严禁用于任何违反法律法规的用途。若您意图将 AstrBot 应用于非法产业或活动，我们**明确反对并拒绝**您使用本项目。

NapCatQQ 是基于无头 QQNT 的 OneBot 协议实现端。它本质上运行了一个 QQNT 实例。

NapCatQQ 的 GitHub 仓库：[NapCatQQ](https://github.com/NapNeko/NapCatQQ)
NapCatQQ 的文档：[NapCatQQ 文档](https://napcat.napneko.icu/)

> [!WARNING]
> 前置准备：
>
> - 一个 QQ 号（最好不是新创建的 QQ 号）。
> - 一台具有摄像功能的手机以扫码登录 QQ。

NapCat 提供了大量的部署方式，包括 Docker、Windows 一键安装包等等。

## 通过一键脚本部署

推荐采用这种方式部署。

### Windows

看这篇文章：[NapCat.Shell - Win手动启动教程](https://napneko.github.io/guide/boot/Shell#napcat-shell-win%E6%89%8B%E5%8A%A8%E5%90%AF%E5%8A%A8%E6%95%99%E7%A8%8B)

### Linux

看这篇文章：[NapCat.Installer - Linux一键使用脚本(支持Ubuntu 20+/Debian 10+/Centos9)](https://napneko.github.io/guide/boot/Shell#napcat-installer-linux%E4%B8%80%E9%94%AE%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC-%E6%94%AF%E6%8C%81ubuntu-20-debian-10-centos9)

> [!TIP]
> **Napcat WebUI 在哪打开**：
> 在 napcat 的日志里会显示 WebUI 链接。
>
> 如果是 linux 命令行一键部署的napcat：`docker log <qq号>`。
>
> Docker部署的 NapCat：`docker logs napcat`。

## 通过 Docker Compose 部署

> [!TIP]
> 如果用 Docker Compose 部署，NapCat 侧无需配置,通过 NapCat WebUI (工作在端口 6099) 或 `docker logs napcat` 登录，仅在 AstrBot 侧开启 aiocqhttp 适配器即可连接，并且可以直接实现文件 `语音数据`、`文件数据` 正常接收与发送。

1. 下载或复制 [astrbot.yml](https://github.com/NapNeko/NapCat-Docker/blob/main/compose/astrbot.yml) 内容
2. 将刚刚下载的文件重命名为 `astrbot.yml`
3. 在 `astrbot.yml` 文件所在目录执行:

```bash
NAPCAT_UID=$(id -u) NAPCAT_GID=$(id -g) docker-compose -f ./astrbot.yml up -d
```

## 通过 Docker 部署

> [!TIP]
> 如果用 Docker 部署，将无法正常接收到`语音数据`、`文件数据`。这意味着语音转文字、沙箱的文件输入功能将无法使用。可以接收到文字消息、图片消息等其他类型的消息。

默认您安装了 Docker。

在终端执行以下命令即可一键部署。

```bash
docker run -d \
-e NAPCAT_GID=$(id -g) \
-e NAPCAT_UID=$(id -u) \
-p 3000:3000 \
-p 3001:3001 \
-p 6099:6099 \
--name napcat \
--restart=always \
mlikiowa/napcat-docker:latest
```

执行成功后，需要查看日志以得到登录二维码和管理面板的 URL。

```bash
docker logs napcat
```

请复制管理面板的 URL，然后在浏览器中打开备用。

然后使用你要登录的 QQ 扫描出现的二维码，即可登录。

如果登录阶段没有出现问题，即成功部署。

## 连接到 AstrBot

## 在 AstrBot 配置 aiocqhttp

1. 进入 AstrBot 的管理面板
2. 点击左边栏 `机器人`
3. 然后在右边的界面中，点击 `+ 创建机器人`
4. 选择 `接入QQ个人号(aiohttp)`

弹出的配置项填写：

配置项填写：

- ID(id)：随意填写，用于区分不同的消息平台实例。
- 启用(enable): 勾选。
- 反向 WebSocket 主机地址：请填写你的机器的 IP 地址。一般情况下请直接填写 `0.0.0.0`
- 反向 WebSocket 端口：填写一个端口，例如 `6199`。

点击 `保存`。

### 配置管理员

填写完毕后，进入 `配置文件` 页，点击 `平台配置` 选项卡，找到 `管理员 ID`，填写你的 QQ 号（不是机器人的 QQ 号）。

切记点击右下角 `保存`，AstrBot 重启并会应用配置。

### 在 NapCatQQ 中添加 WebSocket 客户端

切换回 NapCatQQ 的管理面板，点击 `网络配置->新建->WebSockets客户端`。

![](https://napneko.github.io/assets/use/Astrbot-onebot-2.png)

在新弹出的窗口中：

- 勾选 `启用`。
- `URL` 填写 `ws://宿主机IP:端口/ws`。如 `ws://localhost:6199/ws`或`ws://127.0.0.1:6199/ws`。

> 注意如果是docker部署（用的本文档的docker脚本）那么填写的应该是`ws://astrbot:6199/ws`

- 消息格式：`Array`
- 心跳间隔: `5000`
- 重连间隔: `5000`

> [!WARNING]
>
> 1. 切记后面加一个 `/ws`!
> 2. 这里的 IP 不是 `0.0.0.0`

点击 `保存`。

前往 AstrBot WebUI `控制台`，如果出现 `aiocqhttp(OneBot v11) 适配器已连接。` 相关蓝色的日志，说明连接成功。

## 🎉 大功告成

此时，你的 AstrBot 和 NapCatQQ 应该已经连接成功。使用 `私聊` 的方式在 QQ 对机器人发送 `/help` 以检查是否连接成功。
