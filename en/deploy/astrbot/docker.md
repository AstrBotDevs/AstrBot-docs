# Deploy AstrBot with Docker

> [!WARNING]
> Docker provides a convenient way to deploy AstrBot on Windows, Mac, and Linux.
>
> This tutorial assumes you have Docker installed in your environment. If not, please refer to the [Docker official documentation](https://docs.docker.com/get-docker/) for installation.

## Deploy with Docker Compose

First, clone the AstrBot repository to your local machine:

```bash
git clone https://github.com/AstrBotDevs/AstrBot
cd AstrBot
```

Then, run Compose:

```bash
sudo docker compose up -d
```

## Deploy with Docker

```bash
mkdir astrbot
cd astrbot
sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot soulter/astrbot:latest
```

Regarding port mapping, if you don't want to map so many ports, you can refer to the following table:

| Port    | Description | Type
| -------- | ------- | ------- |
| 6185 |  AstrBot WebUI `default` port  | Required |
| 6195 | WeCom `default` port    | Optional |
| 6199 | OneBot v11 `default` port    | Optional |
| 6196    | QQ Official API(Webhook) HTTP callback server `default` port   | Optional |

> No need to add sudo on Windows, same below
> Sync Host Time on Windows (requires WSL2)

```
-v \\wsl.localhost\(your-wsl-os)\etc\timezone:/etc/timezone:ro
-v \\wsl.localhost\(your-wsl-os)\etc\localtime:/etc/localtime:ro
```

View AstrBot logs with the following command:

```bash
sudo docker logs -f astrbot
```

> [!TIP]
> AstrBot supports Docker-based sandbox code execution. If you need to use the sandbox code executor, please add the `-v /var/run/docker.sock:/var/run/docker.sock` parameter. That is:
>
> ```bash
> sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /var/run/docker.sock:/var/run/docker.sock -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot soulter/astrbot:latest
> ```

## 🎉 All Done

If everything goes well, you will see logs printed by AstrBot.

If there are no errors, you will see a log message similar to `🌈 Dashboard started, accessible at` with several links. Open one of the links to access the AstrBot dashboard.

> [!TIP]
> Since Docker isolates the network environment, you cannot use `localhost` to access the dashboard.
>
> The default username and password are `astrbot` and `astrbot`.
>
> If deployed on a cloud server, you need to open ports `6180-6200` and `11451` in the cloud provider's console.

Next, you need to deploy any messaging platform to use AstrBot on that platform.
