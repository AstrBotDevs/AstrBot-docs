# 社区提供的部署方式

> [!WARNING]
> AstrBot 官方不保证这些部署方式的安全性和稳定性。

## 桌面应用部署（Tauri）

桌面应用仓库：[AstrBot-desktop](https://github.com/AstrBotDevs/AstrBot-desktop)

支持多系统架构，安装包直接安装，开箱即用，最适合新手和懒人的一键桌面部署方案，不推荐服务器场景。

## 启动器一键部署（AstrBot Launcher）

快速部署和多开方案，实现环境隔离。进入 [AstrBot Launcher](https://github.com/AstrBotDevs/astrbot-launcher) 仓库，在 Releases 页最新版本下找到对应的系统安装包安装即可。

# linux综合性安装脚本

综合了文档里的几乎全部安装方式

还包含许多实用的 Linux 工具

astrbot分类在 `基础工具/bot安装/astrbot` 里
```bash
bash -c "$(curl -L https://raw.gitcode.com/nasyt/nasyt-linux-tool/raw/master/nasyt_install.sh)"
```

## Linux 一键部署脚本

使用 `curl` 去下载脚本并且使用 `bash` 执行脚本：

```bash
bash <(curl -sSL https://raw.githubusercontent.com/zhende1113/Antlia/refs/heads/main/Script/AstrBot/Antlia.sh)
```

如果你的系统没有 `curl`，你可以使用 `wget`：

```bash
wget -qO- https://raw.githubusercontent.com/zhende1113/Antlia/refs/heads/main/Script/AstrBot/Antlia.sh | bash
```

仓库地址：[zhende1113/Antlia](https://github.com/zhende1113/Antlia/)

## Linux 一键部署脚本（基于Docker）

支持 AstrBot / NapCat

> [!TIP]
> 权限不足时请使用 `sudo` 提权

### 使用 `curl`

```bash
curl -sSL https://raw.githubusercontent.com/railgun19457/AstrbotScript/main/AstrbotScript.sh -o AstrbotScript.sh
chmod +x AstrbotScript.sh
sudo ./AstrbotScript.sh
```

### 使用 `wget`

```bash
wget -qO AstrbotScript.sh https://raw.githubusercontent.com/railgun19457/AstrbotScript/main/AstrbotScript.sh
chmod +x AstrbotScript.sh
sudo ./AstrbotScript.sh
```

> [!note]
> `sudo ./AstrbotScript.sh --no-color (可选禁用彩色输出)`

__仓库地址：[railgun19457/AstrbotScript](https://github.com/railgun19457/AstrbotScript)__

## AstrBot Android 部署

参考 [zz6zz666/AstrBot-Android-App](https://github.com/zz6zz666/AstrBot-Android-App)
