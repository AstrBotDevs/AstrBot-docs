# 接入 Dify

在 v3.4.2 及之后，AstrBot 支持接入 Dify LLMOps 平台以增强本项目的功能。

## 安装 Dify

如果您还没有安装 Dify，请参考 [Dify 安装文档](https://docs.dify.ai/zh-hans/getting-started/install-self-hosted) 安装。

## 使用

如下图，点击 `dify`，即可创建一个适用于 Dify 的 Provider。

![image](/source/images/provider/image.png)

创建后，如下图所示：

![image](/source/images/dify/image.png)

在 Dify 中，一个 `API Key` 唯一对应一个 Dify 应用。因此，您可以创建多个 Provider 以适配多个 Dify 应用。

根据目前的 Dify 项目，一共有三种类型，分别是：

- chat
- agent
- workflow

请确保你在 AstrBot 里设置的 APP 类型和 Dify 里面创建的应用的类型一致！！！

![image](/source/images/dify/image-3.png)

对于 Workflow 应用，AstrBot 在每次请求时会附上两个变量:

- `astrbot_text_query`: 用户输入的`文本内容`
- `astrbot_session_id`: 会话 ID

因此您需要修改您的 Workflow 的输入的变量名以适配 AstrBot 的输入。

![image](/source/images/dify/image-1.png)

您可以自定义 Workflow 输出的内容对应的变量名，在上图中可看到并可配置。设置好变量名后，您需要修改您的 Workflow 的输出的变量名以让 AstrBot 正确解析。

![image](/source/images/dify/image-2.png)


## 在聊天时动态设置输入变量

使用 `/set` 指令可以动态设置输入变量，如下图所示：

![alt text](/source/images/dify/image-5.png)

当设置变量后，AstrBot 会在下次向 Dify 请求时附上您设置的变量，以灵活适配您的 Workflow。
    
![alt text](/source/images/dify/image-4.png)

当然，可以使用 `/unset` 指令来取消设置的变量。

变量在当前会话永久有效。

> 变量存储在 data/shared_preferences.json 下。