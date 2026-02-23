# 插件测试

AstrBot 提供了完善的测试框架，帮助您为插件编写单元测试和集成测试。

## 测试框架概述

AstrBot 的测试框架位于 `tests/` 目录下，包含以下组件：

- `conftest.py` - 共享的 pytest fixtures 和测试配置
- `fixtures/` - 测试数据和辅助工具
  - `mocks/` - 平台适配器的 mock 工具
  - `helpers.py` - 测试辅助函数
  - `configs/` - 测试配置文件
  - `messages/` - 测试消息数据

## 快速开始

### 安装测试依赖

```bash
pip install pytest pytest-asyncio pytest-cov
```

### 编写第一个测试

在插件目录下创建 `tests/` 文件夹，并添加测试文件：

```python
# tests/test_my_plugin.py
import pytest
from astrbot.api.event import AstrMessageEvent

class TestMyPlugin:
    def test_example(self):
        """一个简单的测试示例"""
        assert True
```

运行测试：

```bash
pytest tests/
```

## 使用 Fixtures

AstrBot 提供了多种预定义的 fixtures，可以在测试中直接使用：

### 基础 Fixtures

```python
def test_with_temp_dir(temp_dir):
    """使用临时目录"""
    assert temp_dir.exists()

def test_with_temp_config(temp_config_file):
    """使用临时配置文件"""
    assert temp_config_file.exists()
```

### Mock Fixtures

```python
def test_with_mock_provider(mock_provider):
    """使用模拟的 Provider"""
    assert mock_provider.get_model() == "gpt-4o-mini"

def test_with_mock_platform(mock_platform):
    """使用模拟的 Platform"""
    assert mock_platform.platform_name == "test_platform"

def test_with_mock_event(mock_event):
    """使用模拟的消息事件"""
    assert mock_event.message_str == "Hello, world!"
```

### 数据库 Fixtures

```python
@pytest.mark.asyncio
async def test_with_temp_db(temp_db):
    """使用临时数据库"""
    # temp_db 是一个异步 fixture
    assert temp_db is not None
```

## 平台适配器 Mock

AstrBot 提供了平台适配器的 mock 工具，方便测试跨平台功能：

### Telegram Mock

```python
from tests.fixtures.mocks import MockTelegramBuilder, mock_telegram_modules

def test_telegram_adapter():
    """测试 Telegram 适配器"""
    bot = MockTelegramBuilder.create_bot()
    assert bot is not None
```

### Discord Mock

```python
from tests.fixtures.mocks import MockDiscordBuilder, mock_discord_modules

def test_discord_adapter():
    """测试 Discord 适配器"""
    client = MockDiscordBuilder.create_client()
    assert client is not None
```

### Aiocqhttp Mock

```python
from tests.fixtures.mocks import MockAiocqhttpBuilder, mock_aiocqhttp_modules

def test_aiocqhttp_adapter():
    """测试 Aiocqhttp 适配器"""
    bot = MockAiocqhttpBuilder.create_bot()
    assert bot is not None
```

## 测试辅助函数

### 创建平台配置

```python
from tests.fixtures import make_platform_config

def test_platform_config():
    """创建平台配置"""
    telegram_config = make_platform_config("telegram")
    assert telegram_config["id"] == "test_telegram"
    
    # 自定义配置
    custom_config = make_platform_config("discord", discord_token="my_token")
    assert custom_config["discord_token"] == "my_token"
```

### 创建 Mock 消息组件

```python
from tests.fixtures import create_mock_message_component

def test_message_component():
    """创建消息组件"""
    plain = create_mock_message_component("plain", text="Hello")
    image = create_mock_message_component("image", url="https://example.com/img.jpg")
```

### 创建 Mock LLM 响应

```python
from tests.fixtures import create_mock_llm_response

def test_llm_response():
    """创建 LLM 响应"""
    response = create_mock_llm_response(
        completion_text="Hello! How can I help you?",
        role="assistant"
    )
    assert response.completion_text == "Hello! How can I help you?"
```

## 测试标记

AstrBot 使用 pytest 标记来分类测试：

```python
import pytest

@pytest.mark.unit
def test_unit():
    """单元测试"""
    pass

@pytest.mark.integration
def test_integration():
    """集成测试"""
    pass

@pytest.mark.slow
def test_slow():
    """慢速测试"""
    pass

@pytest.mark.platform("telegram")
def test_telegram_specific():
    """Telegram 平台特定测试"""
    pass

@pytest.mark.provider
def test_provider():
    """Provider 测试（需要 API Key）"""
    pass
```

## 测试配置文件

### pytest.ini

在项目根目录创建 `pytest.ini`：

```ini
[pytest]
asyncio_mode = auto
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
markers =
    unit: 单元测试
    integration: 集成测试
    slow: 慢速测试
    platform: 平台适配器测试
    provider: LLM Provider 测试
```

## 运行测试

### 运行所有测试

```bash
pytest
```

### 运行特定测试

```bash
# 运行单个文件
pytest tests/test_my_plugin.py

# 运行单个测试函数
pytest tests/test_my_plugin.py::test_example

# 运行特定标记的测试
pytest -m unit
pytest -m "not slow"
```

### 测试覆盖率

```bash
pytest --cov=astrbot --cov-report=html
```

## 最佳实践

1. **测试隔离**：每个测试应该独立运行，不依赖其他测试的状态
2. **使用 Fixtures**：利用 AstrBot 提供的 fixtures 减少重复代码
3. **Mock 外部依赖**：使用 mock 工具模拟外部服务，避免真实 API 调用
4. **清晰的测试名称**：测试函数名应清楚描述测试内容
5. **测试边界情况**：不仅测试正常流程，也要测试异常情况

## 示例：测试插件指令

```python
import pytest
from astrbot.api.event import AstrMessageEvent
from astrbot.api.star import Context, Star

class TestMyPlugin:
    @pytest.fixture
    def plugin(self, mock_context):
        """创建插件实例"""
        from my_plugin import MyPlugin
        return MyPlugin(mock_context)
    
    @pytest.mark.asyncio
    async def test_helloworld_command(self, plugin, mock_event):
        """测试 helloworld 指令"""
        # 设置消息内容
        mock_event.message_str = "/helloworld"
        
        # 调用指令处理函数
        result = await plugin.helloworld(mock_event)
        
        # 验证结果
        assert result is not None
```

## 相关资源

- [pytest 官方文档](https://docs.pytest.org/)
- [pytest-asyncio 文档](https://pytest-asyncio.readthedocs.io/)
- [unittest.mock 文档](https://docs.python.org/3/library/unittest.mock.html)
