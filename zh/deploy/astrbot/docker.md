# 使用 Docker 部署 AstrBot

> [!WARNING]
> 通过 Docker 可以方便地将 AstrBot 部署到 Windows, Mac, Linux 上。
>
> 以下教程默认您的环境已安装 Docker。如果没有安装，请参考 [Docker 官方文档](https://docs.docker.com/get-docker/) 进行安装。

## 通过 Docker Compose 部署

::: details 和 NapCatQQ 一起部署

如果您想使用 NapCat 将 AstrBot **部署到 QQ（个人号）**，使用这种方式会同时部署 AstrBot 和 NapCat，更快。

```bash
mkdir astrbot
cd astrbot
wget https://raw.githubusercontent.com/NapNeko/NapCat-Docker/main/compose/astrbot.yml
sudo docker compose -f astrbot.yml up -d
```

:::

::: details 只部署 AstrBot（通用方式）

首先，需要 Clone AstrBot 仓库到本地：

```bash
git clone https://github.com/AstrBotDevs/AstrBot
cd AstrBot
```

然后，运行 Compose：

```bash
sudo docker compose up -d
```

> [!TIP]
> 如果您的网络环境在中国大陆境内，上述命令将无法正常拉取。您可能需要修改 compose.yml 文件，将其中的 `image: soulter/astrbot:latest` 替换为 `image: m.daocloud.io/docker.io/soulter/astrbot:latest`。
:::

## 通过 Docker 部署

```bash
mkdir astrbot
cd astrbot
sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot soulter/astrbot:latest
```

> [!TIP]
> 如果您的网络环境在中国大陆境内，上述命令将无法正常拉取。请使用以下命令拉取镜像：
>
> ```bash
> sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot m.daocloud.io/docker.io/soulter/astrbot:latest
> ```
>
> (感谢 DaoCloud ❤️)

关于端口映射，如果您不想映射上面这么多端口，可以参考下表：

| Port    | Description | Type
| -------- | ------- | ------- |
| 6185 |  AstrBot WebUI `默认` 端口  | 需要 |
| 6195 | 企业微信 `默认` 端口    | 可选 |
| 6199 | OneBot(aiocqhttp) `默认` 端口    | 可选 |
| 6196    | QQ 官方 API(Webhook) HTTP callback server `默认` 端口   | 可选 |

> Windows 下不需要加 sudo，下同
> Windows 同步 Host Time（需要WSL2）

```
-v \\wsl.localhost\(your-wsl-os)\etc\timezone:/etc/timezone:ro
-v \\wsl.localhost\(your-wsl-os)\etc\localtime:/etc/localtime:ro
```

通过以下命令查看 AstrBot 的日志：

```bash
sudo docker logs -f astrbot
```

> [!TIP]
> AstrBot 支持基于 Docker 的沙箱代码执行器。如果你需要使用沙箱代码执行器，请额外添加 `-v /var/run/docker.sock:/var/run/docker.sock` 参数。即:
>
> ```bash
> sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /var/run/docker.sock:/var/run/docker.sock -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot soulter/astrbot:latest
> ```

## 🎉 大功告成

如果一切顺利，你会看到 AstrBot 打印出的日志。

如果没有报错，你会看到一条日志显示类似 `🌈 管理面板已启动，可访问` 并附带了几条链接。打开其中一个链接即可访问 AstrBot 管理面板。

> [!TIP]
> 由于 Docker 隔离了网络环境，所以不能使用 `localhost` 访问管理面板。
>
> 默认用户名和密码是 `astrbot` 和 `astrbot`。
>
> 如果部署在云服务器上，需要在相应厂商控制台里放行 `6180-6200` 和 `11451` 端口。

接下来，你需要部署任何一个消息平台，才能够实现在消息平台上使用 AstrBot。
