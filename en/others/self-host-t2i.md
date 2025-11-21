# 自行部署文转图服务

AstrBot 使用 [AstrBotDevs/astrbot-t2i-service](https://github.com/AstrBotDevs/astrbot-t2i-service) 项目作为默认的文本转图像服务。默认使用的文转图服务接口是

```plain
https://t2i.soulter.top/text2img
https://t2i.rcfortress.site/text2img
```

此接口能够保障大部分时间正常响应。但是由于部署在国外的（纽约）服务器，因此响应速度可能会比较慢。

> [!TIP]
> 欢迎通过 [爱发电](https://afdian.com/a/astrbot_team) 支持我们，以帮助我们支付服务器费用。

您可以选择自行部署文转图服务，以提升响应速度。

```bash
docker run -itd -p 8999:8999 soulter/astrbot-t2i-service:latest
```

在部署完成后，前往 AstrBot 面板 -> 配置 -> 其他配置，修改`文本转图像服务接口` 为你部署好的 url。

> 如果部署在与 AstrBot 相同的机器上，url 应该为 `http://localhost:8999`。
