# 接入硅基流动

硅基流动依托自研推理引擎实现大模型高效推理加速，提供高效能、低成本的多品类大模型 API 服务，按量收费，助力应用开发轻松实现。

## 部署并配置 AstrBot

### 通过 Docker 部署

请确保你的环境上已经安装了 Docker 和 Git。

```bash
git clone https://github.com/AstrBotDevs/AstrBot
cd AstrBot
docker compose up -d
```

> [!TIP]
> 如果您的网络环境在中国大陆境内，上述命令将无法正常拉取。您可能需要修改 compose.yml 文件，将其中的 `image: soulter/astrbot:latest` 替换为 `image: m.daocloud.io/docker.io/soulter/astrbot:latest`。

### 访问 AstrBot WebUI

```txt
http://127.0.0.1:6185
```

默认账户和密码均为 `astrbot`，登录后会提示修改默认密码。

### 配置对话模型

在硅基流动 [API Keys](https://cloud.siliconflow.cn/me/account/ak) 页面创建一个新的 API Key，留存备用。

在硅基流动[模型页面](https://cloud.siliconflow.cn/me/models)选择需要使用的模型，留存模型名称备用。

进入 AstrBot WebUI，点击左栏 `服务提供商` -> `新增提供商` -> 选择 `硅基流动`。

粘贴上面创建和选择的 `API Key` 和 `模型名称`，点击保存，完成创建。您可以点击下方 `服务提供商可用性` 的 `刷新` 按钮测试配置是否成功。

![配置对话模型_1](../../source/images/siliconflow/image.png)

### 在线聊天测试（可选）

您可在 AstrBot WebUI 左栏 `聊天` 页面来测试您配置的模型。

## 接入消息平台（以飞书为例）

此处以飞书为例。您可前往 [AstrBot 文档](https://docs.astrbot.app/) -> `部署` -> `部署消息平台` 查看其他消息平台的接入方式。

### 创建飞书机器人

前往 [开发者后台](https://open.feishu.cn/app) ，创建企业自建应用。

![创建企业自建应用](../../source/images/lark/image.png)

添加应用能力——机器人。

![添加应用能力](../../source/images/lark/image-1.png)

点击凭证与基础信息，获取 app_id 和 app_secret。

![获取 app_id 和 app_secret](../../source/images/lark/image-4.png)

### 配置 AstrBot

1. 进入 AstrBot 的管理面板
2. 点击左边栏 `机器人`
3. 然后在右边的界面中，点击 `+ 创建机器人`
4. 选择 `lark(飞书)`

弹出的配置项填写：

- ID: 随意填写，用于区分不同的消息平台实例。
- 启用: 勾选。  
- app_id: 获取的 app_id
- app_secret: 获取的 app_secret
- 飞书机器人的名字

如果您正在用国际版飞书，请将 `domain` 设置为 `https://open.larksuite.com`。

在下方的 `配置文件` 中，点击 `选择配置文件` 右边的 ↗️ 箭头按钮。

![选择配置文件](../../source/images/siliconflow/image-2.png)

在呼出的配置页面中，点击默认聊天模型右边的选择提供商按钮，选择刚刚创建的硅基流动的提供商，点击右下角的保存按钮。保存成功后关闭该页面。

![选择提供商](../../source/images/siliconflow/image-3.png)

点击 `保存`，创建机器人。

### 设置回调和权限

接下来，点击事件与回调，使用长连接接收事件，点击保存。**如果上一步没有成功启动，那么这里将无法保存。**

![设置事件与回调](../../source/images/lark/image-6.png)

点击添加事件，消息与群组，下拉找到 `接收消息`，添加。

![添加事件](../../source/images/lark/image-7.png)

点击开通以下权限。

![开通权限](../../source/images/lark/image-8.png)

再点击上面的`保存`按钮。

接下来，点击权限管理，点击开通权限，输入 `im:message:send,im:message,im:message:send_as_bot`。添加筛选到的权限。

再次输入 `im:resource:upload,im:resource` 开通上传图片相关的权限。

最终开通的权限如下图：

![最终开通的权限](../../source/images/lark/image-11.png)

### 创建版本

创建版本。

![创建版本](../../source/images/lark/image-2.png)

填写版本号，更新说明，可见范围后点击保存，确认发布。

### 拉入机器人到群组

进入飞书 APP（网页版飞书无法添加机器人），点进群聊，点击右上角按钮->群机器人->添加机器人。

搜索刚刚创建的机器人的名字。比如教程创建了 `AstrBot` 机器人：

![添加机器人](../../source/images/lark/image-9.png)

### 🎉 大功告成

在群内发送测试消息 `hi`，机器人将做出响应。

## 更多功能

您可以前往 [AstrBot 文档](https://docs.astrbot.app/) 查看更多功能和配置。
