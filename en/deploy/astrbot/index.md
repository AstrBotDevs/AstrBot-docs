# Deploy AstrBot

Choose the deployment method that best suits your needs:

## 🚀 Recommended for Beginners (Simple & Fast)

### Docker Deployment (Highly Recommended)
Using Docker / Docker Compose is the easiest way to deploy AstrBot.

```bash
# 1. Download docker-compose.yml
wget https://raw.githubusercontent.com/AstrBotDevs/AstrBot/main/docker/docker-compose.yml

# 2. Start the service
docker-compose up -d

# 3. Access WebUI
# Default address: http://localhost:8000
```

For detailed instructions, see [Docker Deployment](./docker.md).

### BT Panel Deployment
AstrBot is available in the BT Panel App Store.
1. Log in to BT Panel
2. Go to [App Store]
3. Search for "AstrBot"
4. Click [One-click Deployment]

For detailed instructions, see [BT Panel Deployment](./btpanel.md).

### 1Panel Deployment
AstrBot is available in the 1Panel App Store.
1. Log in to 1Panel
2. Go to [App Store]
3. Search for "AstrBot"
4. Click [Install]

For detailed instructions, see [1Panel Deployment](./1panel.md).

## 🔧 Advanced Deployment

### uv Deployment (Python Users)
If you are familiar with the Python environment, you can use uv:
```bash
# Install and start AstrBot
uvx astrbot
```

For detailed instructions, see [Manual Deployment](./cli.md).

## ☁️ Cloud Deployment

### Deploy on RainYun
AstrBot is available on the RainYun cloud application platform for one-click deployment.
[Click here to deploy on RainYun](https://app.rainyun.com/apps/rca/store/5994?ref=NjU1ODg0)

## 💻 Special Platform Deployment

### Windows One-click Installer
Graphical installation for Windows users.
[Download Windows Installer](./windows.md)

### CasaOS Deployment
Deployment for CasaOS users.
[Deploy AstrBot on CasaOS](./casaos.md)

## 📋 Comparison of Deployment Methods

| Method | Pros | Cons | Use Case |
|----------|------|------|----------|
| Docker | Isolation, Simple | Requires Docker knowledge | Recommended for Production |
| BT Panel | GUI, Easy | Linux only | Server O&M |
| 1Panel | Modern GUI, Feature-rich | Newer project | Modern O&M |
| uv | Lightweight, Native Python | Requires Python env | Local Development |

## 🛠️ FAQ

**Q: Cannot access WebUI after Docker deployment?**
A: Check firewall settings and ensure port 8000 is open.

**Q: How to change the default port?**
A: Modify the port mapping in `docker-compose.yml`.

**Q: How to update after deployment?**
A: Docker users can pull the latest image. Panel users can update via the panel.
