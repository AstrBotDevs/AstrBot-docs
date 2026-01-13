# 杂项

## 获取消息平台实例

> v3.4.34 后

```python
from astrbot.api.event import filter, AstrMessageEvent

@filter.command("test")
async def test_(self, event: AstrMessageEvent):
    from astrbot.api.platform import AiocqhttpAdapter # 其他平台同理
    platform = self.context.get_platform(filter.PlatformAdapterType.AIOCQHTTP)
    assert isinstance(platform, AiocqhttpAdapter)
    # platform.get_client().api.call_action()
```

## 调用 QQ 协议端 API

```py
@filter.command("helloworld")
async def helloworld(self, event: AstrMessageEvent):
    if event.get_platform_name() == "aiocqhttp":
        # qq
        from astrbot.core.platform.sources.aiocqhttp.aiocqhttp_message_event import AiocqhttpMessageEvent
        assert isinstance(event, AiocqhttpMessageEvent)
        client = event.bot # 得到 client
        payloads = {
            "message_id": event.message_obj.message_id,
        }
        ret = await client.api.call_action('delete_msg', **payloads) # 调用 协议端  API
        logger.info(f"delete_msg: {ret}")
```

关于 CQHTTP API，请参考如下文档：

Napcat API 文档：<https://napcat.apifox.cn/>

Lagrange API 文档：<https://lagrange-onebot.apifox.cn/>

## 获取载入的所有插件

```py
plugins = self.context.get_all_stars() # 返回 StarMetadata 包含了插件类实例、配置等等
```

## 获取加载的所有平台

```py
from astrbot.api.platform import Platform
platforms = self.context.platform_manager.get_insts() # List[Platform]
```

---
---

## 关于 astrbot.core.star.Context 类

`astrbot.core.star.Context`类别是astrbot提供给插件的上下文接口
其拥有7个主要的管理器属性

```python
class Context:
    ...

    def __init__(...):
        ...
        """模型供应商管理器"""
        self.provider_manager = provider_manager
        """平台适配器管理器"""
        self.platform_manager = platform_manager
        """会话管理器"""
        self.conversation_manager = conversation_manager
        """平台消息历史管理器"""
        self.message_history_manager = message_history_manager
        """人格角色设定管理器"""
        self.persona_manager = persona_manager
        """配置文件管理器(非webui)"""
        self.astrbot_config_mgr = astrbot_config_mgr
        """知识库管理器"""
        self.kb_manager = knowledge_base_manager
    ...
```

在插件中可以通过`self.context`对这个类别进行访问

---
---

## 关于知识库管理器

它为 `astrbot.core.knowledge_base.kb_mgr`下的`KnowledgeBaseManager`类别在插件中可以通过`self.context.kb_manager`对这个类别进行访问

## 获取所有数据库名称和id以及其对应的编码器id

```python
kb_names = []
kb_ids = []
ep_ids = []
for kb_helper in self.context.kb_manager.kb_insts.values():
    kb_names.append(kb_helper.kb.kb_name)
    kb_ids.append(kb_helper.kb.kb_id)
    ep_ids.append(kb_helper.kb.embedding_provider_id)
```

其中`self.context.kb_manager.kb_insts`是一个`dict[str, KBHelper]`将`kb_id`映射到`kb_helper`, `KBHelper`是一个管理数据库的类别(单个数据库)

## 获取数据库实例

```python
# 使用名称获取
kb_helper: KBHelper | None = await self.context.kb_manager.get_kb_by_name(kb_name)
# 使用kb_id获取
kb_helper: KBHelper | None = await self.context.kb_manager.get_kb(kb_id)
```

## 使用数据库实例上传数据

```python
await kb_helper.upload_document(
    file_name = file_name,
    file_content = file_content,
    file_type = file_type,
    chunk_size = chunk_size,
    chunk_overlap = chunk_overlap,
    batch_size = batch_size,
    tasks_limit = tasks_limit,
    max_retries = max_retries,
    pre_chunked_text = pre_chunked_text
)
```

## 参数说明

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `file_name` | `str` | - | 是 | 文档文件名 |
| `file_content` | `bytes \| None` | - | 否 | 文档二进制内容。当未提供 `pre_chunked_text` 时必须提供 |
| `file_type` | `str` | - | 是 | 文档类型（扩展名） |
| `chunk_size` | `int` | 512 | 否 | 文本分块大小（字符数） |
| `chunk_overlap` | `int` | 50 | 否 | 分块重叠大小（字符数） |
| `batch_size` | `int` | 32 | 否 | 批量处理的大小 |
| `tasks_limit` | `int` | 3 | 否 | 并发任务限制 |
| `max_retries` | `int` | 3 | 否 | 最大重试次数 |
| `progress_callback` | `Callable` | `None` | 否 | 进度回调函数，接收参数 `(stage, current, total)` |
| `pre_chunked_text` | `list[str] \| None` | `None` | 否 | 预分块的文本列表，如果提供则跳过解析和分块步骤 |

## 上传文件(最小实现)

```python
await kb_helper.upload_document(
    file_name = file_name,
    file_content = file_content,    # 文件的bytes格式内容
    file_type = file_type           # 文件类型("md", "txt", "markdown", "xlsx", "docx", "xls","pdf")
)
```

## 上传文本(最小实现)

```python
await kb_helper.upload_document(
    file_name = file_name,
    pre_chunked_text = [text],
    file_type = "txt"
)
```

## 使用数据库管理实例创建数据库

```python
kb_helper = await self.context.kb_manager.create_kb(
    kb_name="技术文档库",
    description="存储技术文档和API参考",
    emoji="💻",
    embedding_provider_id="openai-embedding",
    rerank_provider_id="cohere-rerank",
    chunk_size=1024,
    chunk_overlap=100,
    top_k_dense=30,
    top_k_sparse=30,
    top_m_final=10,
)
```

## 参数说明

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `kb_name` | `str` | - | 是 | 知识库名称 |
| `description` | `str \| None` | `None` | 否 | 知识库描述信息 |
| `emoji` | `str \| None` | `None` | 否 | 知识库的表情符号标识，默认使用 "📚" |
| `embedding_provider_id` | `str \| None` | `None` | 否 | 嵌入模型供应商的 ID |
| `rerank_provider_id` | `str \| None` | `None` | 否 | 重排序模型供应商的 ID |
| `chunk_size` | `int \| None` | `None` | 否 | 文本分块大小（字符数），默认为 512 |
| `chunk_overlap` | `int \| None` | `None` | 否 | 分块重叠大小（字符数），默认为 50 |
| `top_k_dense` | `int \| None` | `None` | 否 | 密集检索返回的 top-k 结果数，默认为 50 |
| `top_k_sparse` | `int \| None` | `None` | 否 | 稀疏检索返回的 top-k 结果数，默认为 50 |
| `top_m_final` | `int \| None` | `None` | 否 | 最终返回的 top-m 结果数，默认为 5 |

## 创建数据库(最小实现)

```python
kb_helper = await self.context.kb_manager.create_kb(
    kb_name = kb_name,                  # 数据库名称
    embedding_provider_id = ep_id       # 编码器id
)
```

## 删除数据库

```python
kb_helper = await self.context.kb_manager.get_kb_by_name(kb_name)
if not kb_helper:
    print(f"kb:{kb_name} 不存在")
    return
kb_id = kb_helper.kb.kb_id
await kb_helper.delete_vec_db()
async with self.context.kb_manager.kb_db.get_db() as session:
    await session.delete(kb_helper.kb)
    await session.commit()
self.context.kb_manager.kb_insts.pop(kb_id, None)
print(f"kb:{kb_name} 成功删除")
```

## 重新加载所有数据库

```python
await self.context.kb_manager.load_kbs()
```

## 获取所有文档

```python
kb_helper: KBHelper|None  = await self.context.kb_manager.get_kb_by_name(kb_name)
list_doc: list[KBDocument] = await kb_helper.list_documents()
```

其中`KBDocument`为`astrbot.core.knowledge_base.models`下的一个类

## 使用数据库实例进行查询(最小实现)

```python
data = await self.context.kb_manager.retrieve(
    query = user_message,       # 问题内容
    kb_names = [kb_name]        # kb_name列表,可以从多个数据库里面查
)
```

## `data` 字典

```python
{
    "context_text": context_text,
    "results": results_dict,
}
```

其中context_text是处理好的返回消息,可以直接使用,results是列表字典,每一个字典表示一个文档块,里面包含这个文档块的全部信息

## `results` 字段

`results` 是一个字典列表，每个字典代表一个检索到的文本块，包含以下字段：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `chunk_id` | `str` | 文本块的唯一标识符 |
| `doc_id` | `str` | 所属文档的ID |
| `kb_id` | `str` | 所属知识库的ID |
| `kb_name` | `str` | 所属知识库的名称 |
| `doc_name` | `str` | 所属文档的名称 |
| `chunk_index` | `int` | 文本块在文档中的索引位置 |
| `content` | `str` | 文本块的内容 |
| `score` | `float` | 检索相关性得分（越高越相关） |
| `char_count` | `int` | 文本块的字符数 |

---
---

# 模型供应商管理器

`ProviderManager` 位于 `astrbot.core.provider.manager` 模块下，在插件中可以通过 `self.context.provider_manager` 访问。

- 注:目前没有提供直接在webui添加自定义供应商的代码,如果需要可以通过修改`astrbot.core.config.default` 下的 `CONFIG_METADATA_2`来修改webui(该方法并不正式,可能会在未来被修复),并且需要在代码注册对应的供应商

## 获取供应商实例

### `get_provider_by_id(provider_id: str) -> Providers`

通过ID获取供应商实例。

**参数：**

- `provider_id`: 供应商的唯一标识符

**返回：**

- `Providers`: 供应商实例（可能是以下五种类型之一）

**示例：**

```python
# 获取嵌入模型供应商
embedding_provider = self.context.provider_manager.get_provider_by_id("openai-embedding")

# 获取LLM供应商
llm_provider = self.context.provider_manager.get_provider_by_id("openai-chat")
```

## 获取所有供应商ID

### `inst_map: Dict[str, Providers]`

包含所有已注册供应商实例的映射表。

**类型：**

```python
from typing import TypeAlias, Union
from astrbot.core.provider.provider import (
    Provider,               # LLM供应商
    STTProvider,            # 语音转文本供应商
    TTSProvider,            # 文本转语音供应商
    EmbeddingProvider,      # 嵌入向量供应商
    RerankProvider          # 重排序供应商
)

Providers: TypeAlias = Union[
    "Provider",
    "STTProvider", 
    "TTSProvider",
    "EmbeddingProvider",
    "RerankProvider",
]
```

**示例：**

```python
# 获取所有已注册的供应商ID
provider_ids = list(self.context.provider_manager.inst_map.keys())

# 遍历所有供应商
for provider_id, provider in self.context.provider_manager.inst_map.items():
    print(f"ID: {provider_id}, Type: {type(provider).__name__}")
```

## 五大供应商类型

- 注:因为不同供应商之间存在具体实现方法的差异,所以这里只讲解其统一父类要求必须实现的方法

### 1. Provider - LLM供应商

#### 核心方法

**`async text_chat(...) -> LLMResponse`**
获取LLM的文本对话结果。

**参数：**

- `prompt`: 提示词（与`contexts`二选一）
- `contexts`: 上下文消息列表
- `image_urls`: 图片URL列表
- `func_tool`: 工具集
- `system_prompt`: 系统提示词
- `model`: 指定使用的模型名称
- `**kwargs`: 其他参数

**`async text_chat_stream(...) -> AsyncGenerator[LLMResponse, None]`**
获取LLM的流式文本对话结果。

**`async get_models() -> list[str]`**
获取供应商支持的模型列表。

**`get_current_key() -> str`**
获取当前使用的API密钥。

**`set_key(key: str)`**
设置API密钥。

---

### 2. STTProvider - 语音转文本供应商

#### 核心方法

**`async get_text(audio_url: str) -> str`**
将音频转换为文本。

**参数：**

- `audio_url`: 音频文件URL或本地路径

**返回：**

- 识别出的文本

---

### 3. TTSProvider - 文本转语音供应商

#### 核心方法

**`async get_audio(text: str) -> str`**
将文本转换为音频。

**参数：**

- `text`: 要转换的文本

**返回：**

- 生成的音频文件路径

---

### 4. EmbeddingProvider - 嵌入向量供应商

#### 核心方法

**`async get_embedding(text: str) -> list[float]`**
获取单个文本的向量表示。

**`async get_embeddings(texts: list[str]) -> list[list[float]]`**
批量获取文本的向量表示。

**`get_dim() -> int`**
获取向量的维度。

**`async get_embeddings_batch(...) -> list[list[float]]`**
批量获取向量（支持分批处理和进度回调）。

---

### 5. RerankProvider - 重排序供应商

#### 核心方法

**`async rerank(query: str, documents: list[str], top_n: Optional[int] = None) -> list[RerankResult]`**
对文档进行重排序。

**参数：**

- `query`: 查询字符串
- `documents`: 文档字符串列表
- `top_n`: 返回前N个结果

---

## 使用示例

---

### 示例1：创建知识库时使用供应商

```python
kb_helper = await self.context.kb_manager.create_kb(
    kb_name="技术文档库",
    description="存储技术文档和API参考",
    emoji="💻",
    embedding_provider_id="openai-embedding",  # 使用嵌入供应商
    rerank_provider_id="cohere-rerank",        # 使用重排序供应商
    chunk_size=1024,
    chunk_overlap=100,
    top_k_dense=30,
    top_k_sparse=30,
    top_m_final=10,
)
```

### 示例2：直接使用供应商进行文本处理

```python
# 获取LLM供应商进行对话
llm_provider = self.context.provider_manager.get_provider_by_id("openai-chat")
response = await llm_provider.text_chat(
    prompt="你好，请介绍一下你自己",
    system_prompt="你是一个有帮助的AI助手"
)

# 获取嵌入供应商处理文本
embedding_provider = self.context.provider_manager.get_provider_by_id("openai-embedding")
vector = await embedding_provider.get_embedding("这是一个示例文本")
```

### 示例3：语音处理

```python
# 语音转文本
stt_provider = self.context.provider_manager.get_provider_by_id("openai-whisper")
text = await stt_provider.get_text("/path/to/audio.wav")

# 文本转语音
tts_provider = self.context.provider_manager.get_provider_by_id("openai-tts")
audio_path = await tts_provider.get_audio("你好，欢迎使用语音合成")
```

### 示例4：文档重排序

```python
# 文档重排序
rerank_provider = self.context.provider_manager.get_provider_by_id("cohere-rerank")
documents = [
    "文档A的内容",
    "文档B的内容", 
    "文档C的内容"
]
results = await rerank_provider.rerank(
    query="用户查询问题",
    documents=documents,
    top_n=5
)
```

## 测试供应商

所有供应商都提供了 `async test()` 方法用于测试连接和功能：

```python
# 测试LLM供应商
llm_provider = self.context.provider_manager.get_provider_by_id("openai-chat")
await llm_provider.test()

# 测试嵌入供应商
embedding_provider = self.context.provider_manager.get_provider_by_id("openai-embedding")
await embedding_provider.test()
```

## 注意事项

1. **错误处理**：所有方法都可能抛出特定于实现的异常，建议使用try-catch包装
2. **异步操作**：大部分方法都是异步的，需要在async函数中调用
3. **资源管理**：注意API密钥的管理和用量控制
4. **并发限制**：批量操作时注意设置合理的并发限制
5. **类型检查**：使用前可检查供应商类型：

   ```python
   from astrbot.core.provider.provider import EmbeddingProvider
   
   provider = self.context.provider_manager.get_provider_by_id("some-id")
   if isinstance(provider, EmbeddingProvider):
       # 执行嵌入相关操作
   ```

## 可以通过以下方式查看所有可用供应商

```python
# 查看所有供应商ID
all_ids = list(self.context.provider_manager.inst_map.keys())
print("可用供应商:", all_ids)

# 按类型分类
for provider_id, provider in self.context.provider_manager.inst_map.items():
    print(f"{provider_id}: {type(provider).__name__}")
```

---
---

## 关于平台适配器管理器

它为 `astrbot.core.platform.manager` 下的`PlatformManager`类别在插件中可以通过`self.context.platform_manager`对这个类别进行访问

- 注:目前没有提供直接在webui添加自定义平台适配器的代码,如果需要可以通过修改`astrbot.core.config.default` 下的 `CONFIG_METADATA_2`来修改webui(该方法并不正式,可能会在未来被修复),并且需要在代码注册对应的供应商

---

## 核心方法

---

## `async load_platform(platform_config: dict)`

实例化并加载一个平台适配器。

**参数：**

- `platform_config: dict` - 平台配置字典，包含平台类型、ID、启用状态等信息

**处理流程：**

1. 检查平台是否启用
2. 根据平台类型动态导入对应的适配器类
3. 创建平台实例并添加到管理列表
4. 启动平台运行任务
5. 触发 `OnPlatformLoadedEvent` 事件处理器

**支持的平台类型：**

- `aiocqhttp` - QQ（基于 go-cqhttp）
- `qq_official` - QQ官方机器人
- `qq_official_webhook` - QQ官方Webhook
- `lark` - 飞书
- `dingtalk` - 钉钉
- `telegram` - Telegram
- `wecom` - 企业微信
- `wecom_ai_bot` - 企业微信AI机器人
- `weixin_official_account` - 微信公众号
- `discord` - Discord
- `misskey` - Misskey
- `slack` - Slack
- `satori` - Satori协议

---

## `async _task_wrapper(task: asyncio.Task, platform: Platform | None = None)`

包装平台运行任务，提供错误处理和状态管理。

**参数：**

- `task: asyncio.Task` - 平台运行任务
- `platform: Platform | None` - 平台实例（可选）

**功能：**

- 设置平台运行状态
- 捕获并记录任务异常
- 管理平台状态转换

### `async reload(platform_config: dict)`

重新加载平台配置。

**参数：**

- `platform_config: dict` - 新的平台配置

**处理流程：**

1. 终止已存在的同名平台
2. 如果新配置启用，则加载新平台
3. 清理已从配置中移除的平台

---

## `async terminate_platform(platform_id: str)`

终止指定平台适配器。

**参数：**

- `platform_id: str` - 要终止的平台ID

### `async terminate()`

终止所有平台适配器。

### `get_insts() -> list[Platform]`

获取所有平台实例。

**返回：**

- `list[Platform]` - 平台实例列表

### `get_all_stats() -> dict`

获取所有平台的统计信息。

**返回：**
包含以下结构的字典：

```python
{
    "platforms": [
        {
            "id": "平台ID",
            "type": "平台类型",
            "status": "运行状态",
            "error_count": 错误数量,
            "last_error": "最后错误信息"
        },
        # ... 更多平台
    ],
    "summary": {
        "total": 平台总数,
        "running": 运行中数量,
        "error": 错误状态数量,
        "total_errors": 总错误数
    }
}
```

## 注意事项

以上代码都是和前端代码高度绑定的,直接在代码进行操作是不明智的

- 注:可以通过`astrbot.core.platform.register`下的`register_platform_adapter`进行平台适配器进行注册自定义平台,然后通过修改`astrbot.core.config.default` 下的 `CONFIG_METADATA_2`来修改前端配置,并且重构`terminate_platform`函数并替换掉类方法,通过这样的方法就可以完成一个自定义平台供应商(这个行为是危险并且具有一定时效性的,不建议这样操作,这个操作是非官方的所以这里不给出示例代码)

---
---

## 会话管理器

它为 `astrbot.core.conversation_mgr` 下的`ConversationManager`类别,在插件中可以通过`self.context.conversation_manager`对这个类别进行访问

---

## 使用示例

---

## 获取所有会话和其对应的对话

```python
for unified_msg_origin, conversation_id in self.context.conversation_manager.session_conversations.items():
    print(f"会话ID({unified_msg_origin})\n对话ID({conversation_id})")
```

## 获取对话

```python
conv = await self.context.conversation_manager.db.get_conversation_by_id(cid=conversation_id)
```

## 获取对话名称

```python
conv = await self.context.conversation_manager.db.get_conversation_by_id(cid=conversation_id)
print(f"对话({conversation_id})的名称为({conv.platform_id})")
```

## 创建新对话

```python
# 创建新的对话
unified_msg_origin = "wechat:group:123456789"
conversation_id = await self.context.conversation_manager.new_conversation(
    unified_msg_origin=unified_msg_origin,
    platform_id="wechat",  # 可选，如果不提供会从 unified_msg_origin 解析
    content=[
        {"role": "user", "content": "你好"},
        {"role": "assistant", "content": "你好！有什么可以帮助你的？"}
    ],  # 可选，初始对话历史
    title="第一次对话",  # 可选，对话标题
    persona_id="default_persona",  # 可选，Persona ID
)

print(f"新创建的对话ID: {conversation_id}")
```

## 切换对话

```python
unified_msg_origin = "wechat:group:123456789"
target_conversation_id = "550e8400-e29b-41d4-a716-446655440000"

await self.context.conversation_manager.switch_conversation(
    unified_msg_origin=unified_msg_origin,
    conversation_id=target_conversation_id,
)

print(f"已将会话切换到对话: {target_conversation_id}")
```

## 获取当前对话ID

```python
unified_msg_origin = "wechat:group:123456789"
conversation_id = await self.context.conversation_manager.get_curr_conversation_id(unified_msg_origin)

if conversation_id:
    print(f"当前对话ID: {conversation_id}")
else:
    print("当前没有活动的对话")
```

## 获取对话对象

```python
unified_msg_origin = "wechat:group:123456789"
conversation_id = "550e8400-e29b-41d4-a716-446655440000"

# 获取对话对象
conv = await self.context.conversation_manager.get_conversation(
    unified_msg_origin=unified_msg_origin,
    conversation_id=conversation_id,
)

if conv:
    print(f"对话标题: {conv.platform_id}")
    print(f"对话创建时间: {conv.created_at}")
    # 获取对话历史
    history = json.loads(conv.history) if conv.history else []
    print(f"对话历史长度: {len(history)}")
else:
    print("对话不存在")
```

## 获取对话列表

```python
# 获取特定会话的所有对话
unified_msg_origin = "wechat:group:123456789"
conversations = await self.context.conversation_manager.get_conversations(
    unified_msg_origin=unified_msg_origin,
)

print(f"会话 {unified_msg_origin} 共有 {len(conversations)} 个对话:")
for conv in conversations:
    print(f"  - {conv.platform_id} (ID: {conv.cid})")

# 按平台过滤对话
wechat_conversations = await self.context.conversation_manager.get_conversations(
    platform_id="wechat",
)
```

## 获取过滤后的对话列表（分页）

```python
# 获取第一页，每页20条
conversations, total = await self.context.conversation_manager.get_filtered_conversations(
    page=1,
    page_size=20,
    platform_ids=["wechat", "qq"],  # 可选，过滤平台
    search_query="重要",  # 可选，搜索标题或内容
)

print(f"总共有 {total} 个对话，当前显示第 1 页:")
for conv in conversations:
    print(f"  - {conv.platform_id} (ID: {conv.cid})")
```

## 更新对话

```python
unified_msg_origin = "wechat:group:123456789"

# 更新当前对话
await self.context.conversation_manager.update_conversation(
    unified_msg_origin=unified_msg_origin,
    history=[
        {"role": "user", "content": "你好"},
        {"role": "assistant", "content": "你好！我是助手"},
        {"role": "user", "content": "今天天气怎么样？"}
    ],
    title="天气咨询对话",
    persona_id="weather_assistant",
    token_usage=150,  # 更新token使用量
)

# 更新指定对话
await self.context.conversation_manager.update_conversation(
    unified_msg_origin=unified_msg_origin,
    conversation_id="550e8400-e29b-41d4-a716-446655440000",
    title="新的标题",
)
```

## 添加消息对到对话

```python
from astrbot.core.agent.message import UserMessageSegment, AssistantMessageSegment

cid = "550e8400-e29b-41d4-a716-446655440000"

# 使用 MessageSegment 对象
user_msg = UserMessageSegment(content="今天天气怎么样？")
assistant_msg = AssistantMessageSegment(content="今天天气晴朗，温度适宜。")

await self.context.conversation_manager.add_message_pair(
    cid=cid,
    user_message=user_msg,
    assistant_message=assistant_msg,
)

# 或者使用字典格式
await self.context.conversation_manager.add_message_pair(
    cid=cid,
    user_message={"role": "user", "content": "明天呢？"},
    assistant_message={"role": "assistant", "content": "明天可能会有小雨。"},
)
```

## 获取人类可读的上下文（分页）

```python
unified_msg_origin = "wechat:group:123456789"
conversation_id = "550e8400-e29b-41d4-a716-446655440000"

# 获取第一页，每页10条记录
contexts, total_pages = await self.context.conversation_manager.get_human_readable_context(
    unified_msg_origin=unified_msg_origin,
    conversation_id=conversation_id,
    page=1,
    page_size=10,
)

print(f"对话上下文（第1页，共{total_pages}页）:")
for i, context in enumerate(contexts, 1):
    print(f"{i}. {context}")
```

## 删除对话

```python
unified_msg_origin = "wechat:group:123456789"

# 删除指定对话
await self.context.conversation_manager.delete_conversation(
    unified_msg_origin=unified_msg_origin,
    conversation_id="550e8400-e29b-41d4-a716-446655440000",
)

# 删除当前对话
await self.context.conversation_manager.delete_conversation(unified_msg_origin)

print("对话已删除")
```

## 删除会话的所有对话

```python
unified_msg_origin = "wechat:group:123456789"

await self.context.conversation_manager.delete_conversations_by_user_id(
    unified_msg_origin=unified_msg_origin,
)

print(f"已删除会话 {unified_msg_origin} 的所有对话")
# 注意：这会触发所有注册的会话删除回调函数
```

---

## 数据结构

### Conversation 对象

```python
class Conversation:
    platform_id: str      # 平台ID
    user_id: str         # 用户ID（即 unified_msg_origin）
    cid: str            # 对话ID（UUID）
    history: str        # 历史记录（JSON字符串）
    title: str          # 对话标题
    persona_id: str     # 角色ID
    created_at: int     # 创建时间戳
    updated_at: int     # 更新时间戳
    token_usage: int    # token使用量
```

### 历史记录格式

```json
[
    {
        "role": "user",
        "content": "用户消息内容"
    },
    {
        "role": "assistant",
        "content": "助手回复内容",
        "tool_calls": [...]  # 可选：函数调用信息
    }
]
```

## 注意事项

1. **会话ID格式**：必须遵循 `platform_name:message_type:session_id` 格式
2. **对话ID**：由系统自动生成的UUID，确保全局唯一性
3. **回调函数**：会话删除回调必须是异步函数，且需自行处理异常
4. **性能**：大量对话时建议使用分页查询，避免内存溢出
5. **一致性**：内存缓存和数据库存储之间可能存在短暂的不一致

---
---

## 平台消息历史管理器

它为 `astrbot.core.platform_message_history_mgr` 下的`PlatformMessageHistoryManager`类别,在插件中可以通过`self.context.message_history_manager`对这个类别进行访问

---

## 使用示例

---

注:以下`user_id`实际为`unified_msg_origin`(消息来源唯一标识符),`platform_id`为平台ID

## 插入平台消息历史记录

```python
# 插入一条新的平台消息历史记录
message_content = {
    "message_id": "msg_001",
    "message_type": "text",
    "content": "你好，这是一条测试消息",
    "timestamp": "2024-01-15T10:30:00Z",
    "attachments": [],  # 可选：附件列表
    "metadata": {      # 可选：额外的元数据
        "source": "wechat",
        "is_group": True
    }
}

history_record = await self.context.message_history_manager.insert(
    platform_id="wechat",
    user_id="wechat:group:123456789",
    content=message_content,
    sender_id="sender_789",    # 可选：发送者ID
    sender_name="张三",        # 可选：发送者名称
)

print(f"插入的消息历史记录ID: {history_record.id}")
print(f"创建时间: {history_record.created_at}")
```

## 获取平台消息历史记录

```python
# 获取特定用户的消息历史（最近的消息在前）
platform_id = "wechat"
user_id = "wechat:group:123456789"

# 获取第一页，每页200条
history_list = await self.context.message_history_manager.get(
    platform_id=platform_id,
    user_id=user_id,
    page=1,
    page_size=200,
)

print(f"用户 {user_id} 在平台 {platform_id} 的消息历史:")
print(f"共获取到 {len(history_list)} 条记录")
print()

# 显示消息内容
for i, record in enumerate(history_list, 1):
    print(f"{i}. 时间: {record.created_at}")
    print(f"   发送者: {record.sender_name or record.sender_id or '未知'}")
    
    # 解析消息内容
    content = record.content
    msg_type = content.get("message_type", "unknown")
    msg_content = content.get("content", "")
    
    print(f"   类型: {msg_type}")
    print(f"   内容: {msg_content[:50]}..." if len(str(msg_content)) > 50 else f"   内容: {msg_content}")
    print("-" * 50)
```

## 删除历史消息记录

```python
# 删除超过指定时间的历史记录
platform_id = "wechat"
user_id = "wechat:group:123456789"

# 删除24小时前的记录（默认86400秒 = 24小时）
await self.context.message_history_manager.delete(
    platform_id=platform_id,
    user_id=user_id,
    offset_sec=86400,
)
```

---
---

## 人格角色设定管理器

它为 `astrbot.core.persona_mgr` 下的`PersonaManager`类别,在插件中可以通过`self.context.persona_manager`对这个类别进行访问

---

## 使用示例

---

## 获取人格信息

```python
# 获取指定人格
try:
    persona = await self.context.persona_manager.get_persona("assistant")
    print(f"人格ID: {persona.persona_id}")
    print(f"系统提示词: {persona.system_prompt}")
    print(f"初始对话: {persona.begin_dialogs or []}")
    print(f"可用工具: {persona.tools or '所有工具'}")
except ValueError as e:
    print(f"错误: {e}")

# 获取所有人格
all_personas = await self.context.persona_manager.get_all_personas()
print(f"\n系统中所有人格:")
for p in all_personas:
    print(f"- {p.persona_id}: {p.system_prompt[:50]}...")
```

## 获取默认人格（v3格式）

```python
# 获取默认人格（支持MessageSession或umo字符串）
from astrbot.core.platform.message_session import MessageSession

# 使用MessageSession
message_session = MessageSession(...)  # 实际的消息会话对象
default_persona_v3 = await self.context.persona_manager.get_default_persona_v3(message_session)
print(f"默认人格名称: {default_persona_v3['name']}")
print(f"提示词: {default_persona_v3['prompt']}")

# 使用umo字符串
umo = "wechat:group:123456789"
default_persona_v3 = await self.context.persona_manager.get_default_persona_v3(umo)
print(f"默认人格: {default_persona_v3['name']}")

# 如果没有配置，返回默认人格
default_persona = await self.context.persona_manager.get_default_persona_v3()
print(f"系统默认人格: {default_persona['name']}")
```

## 创建新人格

```python
# 创建不带工具限制的人格
new_persona = await self.context.persona_manager.create_persona(
    persona_id="translator",
    system_prompt="You are a professional translator. Translate the user's text accurately.",
    begin_dialogs=[
        "你好，请帮我翻译这段话。",
        "Sure, I'd be happy to help you with translation."
    ]
)
print(f"创建人格成功: {new_persona.persona_id}")

# 创建带特定工具的人格
new_persona = await self.context.persona_manager.create_persona(
    persona_id="weather_forecaster",
    system_prompt="You are a weather forecaster. Provide accurate weather information.",
    begin_dialogs=[
        "今天天气怎么样？",
        "让我查看一下今天的天气预报..."
    ],
    tools=["get_weather", "get_forecast"]  # 只允许使用这两个工具
)
print(f"创建天气预测人格成功: {new_persona.persona_id}")

# 创建不使用任何工具的人格
new_persona = await self.context.persona_manager.create_persona(
    persona_id="chat_bot",
    system_prompt="You are a friendly chatbot for casual conversation.",
    begin_dialogs=[
        "你好！",
        "你好！很高兴见到你！今天过得怎么样？"
    ],
    tools=[]  # 空列表表示不使用任何工具
)
print(f"创建聊天机器人格成功: {new_persona.persona_id}")

# 创建使用所有工具的人格（默认行为）
new_persona = await self.context.persona_manager.create_persona(
    persona_id="expert_assistant",
    system_prompt="You are an expert assistant with access to all tools.",
    tools=None  # None 表示使用所有可用工具
)
print(f"创建专家助手人格成功: {new_persona.persona_id}")
```

## 更新人格信息

```python
# 更新人格的提示词
updated_persona = await self.context.persona_manager.update_persona(
    persona_id="translator",
    system_prompt="You are a professional translator with expertise in both English and Chinese."
)
print(f"更新人格提示词成功: {updated_persona.persona_id}")

# 更新初始对话
updated_persona = await self.context.persona_manager.update_persona(
    persona_id="translator",
    begin_dialogs=[
        "请将这段英文翻译成中文。",
        "好的，我来帮您翻译这段英文。",
        "How are you today?",
        "您今天过得怎么样？"
    ]
)
print(f"更新初始对话成功: {updated_persona.begin_dialogs}")

# 更新工具权限
updated_persona = await self.context.persona_manager.update_persona(
    persona_id="translator",
    tools=["translate_text", "language_detection"]  # 只允许这两个工具
)
print(f"更新工具权限成功: {updated_persona.tools}")

# 更新所有属性
updated_persona = await self.context.persona_manager.update_persona(
    persona_id="translator",
    system_prompt="Updated: Professional bilingual translator.",
    begin_dialogs=["New translation request", "Processing..."],
    tools=["translate_text"]
)
print(f"完整更新人格成功: {updated_persona.persona_id}")
```

## 删除人格

```python
# 删除指定人格
try:
    await self.context.persona_manager.delete_persona("old_assistant")
    print("人格删除成功")
    
    # 验证删除
    remaining_personas = await self.context.persona_manager.get_all_personas()
    print(f"剩余人格数量: {len(remaining_personas)}")
except ValueError as e:
    print(f"删除失败: {e}")

# 尝试删除不存在的人格
try:
    await self.context.persona_manager.delete_persona("non_existent")
except ValueError as e:
    print(f"预期错误: {e}")
```

## 获取v3格式人格数据

```python
# 获取v3格式的人格数据
v3_config, personas_v3, default_persona_v3 = self.context.persona_manager.get_v3_persona_data()

print(f"v3配置数量: {len(v3_config)}")
print(f"v3人格对象数量: {len(personas_v3)}")
print(f"默认v3人格: {default_persona_v3['name']}")

# 查看v3配置详情
for config in v3_config[:3]:  # 只显示前3个
    print(f"\n人格: {config['name']}")
    print(f"提示词长度: {len(config['prompt'])} 字符")
    print(f"初始对话数量: {len(config['begin_dialogs'])}")
    print(f"工具: {config.get('tools', '所有工具')}")

# 查看v3人格对象
for persona_v3 in personas_v3[:2]:  # 只显示前2个
    print(f"\nv3人格对象: {persona_v3['name']}")
    print(f"已处理的初始对话: {len(persona_v3['_begin_dialogs_processed'])} 条")
```

---
---

## 配置文件管理器

它为 `astrbot.core.astrbot_config_mgr` 下的`AstrBotConfigManager`类别,在插件中可以通过`self.context.astrbot_config_mgr`对这个类别进行访问

---

## 使用示例

---

## 获取配置信息

### 获取特定会话的配置

```python
from astrbot.core.platform.message_session import MessageSession

# 创建消息会话
session = MessageSession(
    platform_id="wechat",
    message_type="group",
    session_id="123456789"
)

# 获取该会话的配置
config = config_manager.get_conf(session)
print(f"会话配置: {config}")

# 或者使用 UMO 字符串
umo_str = "wechat:group:123456789"
config = config_manager.get_conf(umo_str)
print(f"UMO字符串配置: {config}")

# 获取默认配置
default_config = config_manager.default_conf
print(f"默认配置: {default_config}")
```

### 快捷获取配置项

```python
# 使用 g() 方法快速获取配置值
umo = "wechat:group:123456789"

# 获取 provider_settings
provider_settings = config_manager.g(umo, "provider_settings")
print(f"Provider设置: {provider_settings}")

# 获取特定键值，带默认值
api_key = config_manager.g(umo, "api_key", "default_api_key")
print(f"API Key: {api_key}")

# 如果键不存在，返回默认值
non_existent = config_manager.g(umo, "non_existent_key", "fallback_value")
print(f"不存在的键: {non_existent}")

# 获取默认配置的键值
default_value = config_manager.g(None, "default_setting", "fallback")
print(f"默认配置值: {default_value}")
```

### 获取配置元数据

```python
# 获取特定会话的配置信息
session = MessageSession(
    platform_id="qq",
    message_type="private",
    session_id="987654321"
)

conf_info = config_manager.get_conf_info(session)
print(f"配置ID: {conf_info['id']}")
print(f"配置名称: {conf_info['name']}")
print(f"配置文件路径: {conf_info['path']}")

# 获取所有配置列表
conf_list = config_manager.get_conf_list()
print(f"\n系统中所有配置 ({len(conf_list)} 个):")
for info in conf_list:
    print(f"  - {info['name']} (ID: {info['id']})")
    print(f"    路径: {info['path']}")
```

## 配置管理操作

### 创建新配置

```python
# 基于默认配置创建新配置
custom_config = {
    "provider_settings": {
        "provider": "openai",
        "model": "gpt-4",
        "api_key": "your_api_key_here"
    },
    "features": {
        "enable_history": True,
        "max_history_length": 50
    }
}

# 创建配置（带名称）
conf_id = config_manager.create_conf(
    config=custom_config,
    name="高级助手配置"
)
print(f"新配置创建成功，ID: {conf_id}")

# 创建使用完全默认值的配置
simple_conf_id = config_manager.create_conf(name="简单配置")
print(f"简单配置创建成功，ID: {simple_conf_id}")

# 验证配置已加载
if simple_conf_id in config_manager.confs:
    print(f"配置 {simple_conf_id} 已成功加载到内存")
```

### 更新配置信息

```python
# 更新配置名称
conf_id = "550e8400-e29b-41d4-a716-446655440000"  # 假设这是已有的配置ID

try:
    success = config_manager.update_conf_info(
        conf_id=conf_id,
        name="更新后的配置名称"
    )
    if success:
        print(f"配置 {conf_id} 名称更新成功")
        
        # 验证更新
        conf_list = config_manager.get_conf_list()
        for info in conf_list:
            if info['id'] == conf_id:
                print(f"新名称: {info['name']}")
                break
except ValueError as e:
    print(f"更新失败: {e}")
```

### 删除配置

```python
conf_id = "550e8400-e29b-41d4-a716-446655440000"  # 要删除的配置ID

try:
    success = config_manager.delete_conf(conf_id)
    if success:
        print(f"配置 {conf_id} 删除成功")
        
        # 验证删除
        conf_list = config_manager.get_conf_list()
        ids = [info['id'] for info in conf_list]
        if conf_id not in ids:
            print("配置已从列表中移除")
    else:
        print(f"配置 {conf_id} 删除失败")
except ValueError as e:
    print(f"删除失败: {e}")

# 尝试删除默认配置（会失败）
try:
    config_manager.delete_conf("default")
except ValueError as e:
    print(f"预期错误: {e}")
```

---
