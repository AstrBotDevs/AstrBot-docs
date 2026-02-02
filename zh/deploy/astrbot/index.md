# 部署 AstrBot

选择最适合您需求的部署方式：

## 🚀 初学者推荐（简单快捷）

### Docker 部署（最推荐）
使用 Docker / Docker Compose 是部署 AstrBot 最简单的方式。

```bash
# 1. 下载 docker-compose.yml 文件
wget https://raw.githubusercontent.com/AstrBotDevs/AstrBot/main/docker/docker-compose.yml

# 2. 启动服务
docker-compose up -d

# 3. 访问 WebUI
# 默认地址: http://localhost:8000
```

详细教程请参阅 [Docker 部署](./docker.md)。

### 宝塔面板部署
AstrBot 与宝塔面板合作，已上架至宝塔面板应用商店。
1. 登录宝塔面板
2. 进入【软件商店】
3. 搜索"AstrBot"
4. 点击【一键部署】

详细教程请参阅 [宝塔面板部署](./btpanel.md)。

### 1Panel 部署
AstrBot 已由 1Panel 官方上架至 1Panel 应用商店。
1. 登录 1Panel 控制台
2. 进入【应用商店】
3. 搜索"AstrBot"
4. 点击【安装】

详细教程请参阅 [1Panel 部署](./1panel.md)。

## 🔧 进阶部署方式

### uv 部署（Python 用户）
如果您熟悉 Python 环境，可以使用 uv 部署：
```bash
# 安装并启动 AstrBot
uvx astrbot
```

详细教程请参阅 [手动部署](./cli.md)。

## ☁️ 云平台部署

### 在 雨云 上部署
AstrBot 已由雨云官方上架至云应用平台，可一键部署。
[点击这里在雨云上部署](https://app.rainyun.com/apps/rca/store/5994?ref=NjU1ODg0)

详细教程请参阅 [雨云部署](./rainyun.md)。

## 💻 特殊平台部署

### Windows 一键安装器
适合 Windows 用户的图形化安装方式。
[下载 Windows 一键安装器](./windows.md)

### CasaOS 部署
适合 CasaOS 用户的部署方式。
[在 CasaOS 上部署 AstrBot](./casaos.md)

## 📋 部署方式对比

| 部署方式 | 优点 | 缺点 | 适用场景 |
|----------|------|------|----------|
| Docker | 环境隔离、部署简单 | 需要学习 Docker | 生产环境推荐 |
| 宝塔面板 | 图形界面、操作简单 | 仅限 Linux 服务器 | 服务器运维 |
| 1Panel | 现代化界面、功能丰富 | 较新项目 | 现代化运维 |
| uv | 轻量级、Python 原生 | 依赖 Python 环境 | 本地开发 |

## 🛠️ 常见问题

**Q: Docker 部署后无法访问 WebUI？**
A: 检查防火墙设置，确保 8000 端口已开放。

**Q: 如何修改默认端口？**
A: 在 docker-compose.yml 中修改端口映射配置。

**Q: 部署后如何更新版本？**
A: Docker 用户重新拉取镜像即可，面板用户可通过面板一键更新。
