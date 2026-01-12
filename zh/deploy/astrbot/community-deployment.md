# 社区提供的部署方式

> [!WARNING]
> AstrBot 官方不保证这些部署方式的安全性和稳定性。

# linux综合性安装脚本

综合了文档里的几乎全部安装方式

还包含许多实用的 Linux 工具

astrbot分类在 `基础工具/bot安装/astrbot` 里
```bash
bash -c "$(curl -L https://gitee.com/nasyt/nasyt-linux-tool/raw/master/nasyt.sh)"
```

## Linux 一键部署脚本

使用 `curl` 去下载脚本并且使用 `bash` 执行脚本：

```bash
bash -c "$(curl -L https://raw.gitcode.com/nasyt/nasyt-linux-tool/raw/master/nasyt_install.sh)"
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
