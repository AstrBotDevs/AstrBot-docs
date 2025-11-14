# 社区提供的部署方式

> AstrBot 官方不保证这些部署方式的安全性和稳定性。

***

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

## Termux部署报错解决方案

>如果出现了 `[WARN] uv sync 失败，重试 2/3
  × Failed to build astrbot @ file:///root/
  ├─▶ Failed to install requirements from build-system.requires
  ├─▶ Failed to install build dependencies
  ├─▶ Failed to install: trove_classifiers-2025.9.11.17-py3-none-any.whl
  │   (trove-classifiers==2025.9.11.17)
  ╰─▶ failed to hardlink file from
      /root/.cache/uv/archive-v0/10gPuxc61Audvy1Eg6SFz/trove_classifiers/.l2s.__init__.py0001
      to
      /root/.cache/uv/builds-v0/.tmp2lFVJx/lib/python3.10/site-packages/trove_classifiers/.l2s.__init__.py0001:
      Operation not permitted (os error 1)

可以先运行以下命令，然后再重新启动

>仅限Termux部署环境使用！
>仅限Termux部署环境使用！
>仅限Termux部署环境使用！

>```bash
>echo 'export UV_LINK_MODE=copy' >> ~/.bashrc 
>```
>```bash
>source ~/.bashrc
>```


***

## Linux 一键部署脚本（基于Docker）
#### 支持 AstrBot / NapCat / WeChatPadPro
#### 拉取并运行脚本
> [!TIP]
> 权限不足时请使用`sudo`提权


   使用`curl`
   ```bash
   curl -sSL https://raw.githubusercontent.com/railgun19457/AstrbotScript/main/AstrbotScript.sh -o AstrbotScript.sh
   chmod +x AstrbotScript.sh
   sudo ./AstrbotScript.sh
   ```

   使用`wget`
   ```bash
   wget -qO AstrbotScript.sh https://raw.githubusercontent.com/railgun19457/AstrbotScript/main/AstrbotScript.sh
   chmod +x AstrbotScript.sh
   sudo ./AstrbotScript.sh
   ```

  > [!note]
  > `sudo ./AstrbotScript.sh --no-color (可选禁用彩色输出)`

<img width="358" height="400" alt="image" src="https://github.com/user-attachments/assets/9707d753-34d6-468a-aa0f-97d32cfdb01a" /><img width="357" height="405" alt="image" src="https://github.com/user-attachments/assets/4af93c5b-aef8-4885-b2fe-9632e28c6362" />


**仓库地址：[railgun19457/AstrbotScript](https://github.com/railgun19457/AstrbotScript)**
