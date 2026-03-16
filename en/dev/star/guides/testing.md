# Plugin Testing

AstrBot provides a comprehensive testing framework to help you write unit tests and integration tests for your plugins.

## Testing Framework Overview

AstrBot's testing framework is located in the `tests/` directory and includes the following components:

- `conftest.py` - Shared pytest fixtures and test configuration
- `fixtures/` - Test data and helper utilities
  - `mocks/` - Platform adapter mock tools
  - `helpers.py` - Test helper functions
  - `configs/` - Test configuration files
  - `messages/` - Test message data

## Quick Start

### Install Test Dependencies

```bash
pip install pytest pytest-asyncio pytest-cov
```

### Write Your First Test

Create a `tests/` folder in your plugin directory and add a test file:

```python
# tests/test_my_plugin.py
import pytest
from astrbot.api.event import AstrMessageEvent

class TestMyPlugin:
    def test_example(self):
        """A simple test example"""
        assert True
```

Run the tests:

```bash
pytest tests/
```

## Using Fixtures

AstrBot provides various predefined fixtures that can be used directly in tests:

### Basic Fixtures

```python
def test_with_temp_dir(temp_dir):
    """Use temporary directory"""
    assert temp_dir.exists()

def test_with_temp_config(temp_config_file):
    """Use temporary config file"""
    assert temp_config_file.exists()
```

### Mock Fixtures

```python
def test_with_mock_provider(mock_provider):
    """Use mock Provider"""
    assert mock_provider.get_model() == "gpt-4o-mini"

def test_with_mock_platform(mock_platform):
    """Use mock Platform"""
    assert mock_platform.platform_name == "test_platform"

def test_with_mock_event(mock_event):
    """Use mock message event"""
    assert mock_event.message_str == "Hello, world!"
```

### Database Fixtures

```python
@pytest.mark.asyncio
async def test_with_temp_db(temp_db):
    """Use temporary database"""
    # temp_db is an async fixture
    assert temp_db is not None
```

## Platform Adapter Mocks

AstrBot provides mock tools for platform adapters to facilitate cross-platform testing:

### Telegram Mock

```python
from tests.fixtures.mocks import MockTelegramBuilder, mock_telegram_modules

def test_telegram_adapter():
    """Test Telegram adapter"""
    bot = MockTelegramBuilder.create_bot()
    assert bot is not None
```

### Discord Mock

```python
from tests.fixtures.mocks import MockDiscordBuilder, mock_discord_modules

def test_discord_adapter():
    """Test Discord adapter"""
    client = MockDiscordBuilder.create_client()
    assert client is not None
```

### Aiocqhttp Mock

```python
from tests.fixtures.mocks import MockAiocqhttpBuilder, mock_aiocqhttp_modules

def test_aiocqhttp_adapter():
    """Test Aiocqhttp adapter"""
    bot = MockAiocqhttpBuilder.create_bot()
    assert bot is not None
```

## Test Helper Functions

### Creating Platform Configs

```python
from tests.fixtures import make_platform_config

def test_platform_config():
    """Create platform config"""
    telegram_config = make_platform_config("telegram")
    assert telegram_config["id"] == "test_telegram"
    
    # Custom config
    custom_config = make_platform_config("discord", discord_token="my_token")
    assert custom_config["discord_token"] == "my_token"
```

### Creating Mock Message Components

```python
from tests.fixtures import create_mock_message_component

def test_message_component():
    """Create message components"""
    plain = create_mock_message_component("plain", text="Hello")
    image = create_mock_message_component("image", url="https://example.com/img.jpg")
```

### Creating Mock LLM Responses

```python
from tests.fixtures import create_mock_llm_response

def test_llm_response():
    """Create LLM response"""
    response = create_mock_llm_response(
        completion_text="Hello! How can I help you?",
        role="assistant"
    )
    assert response.completion_text == "Hello! How can I help you?"
```

## Test Markers

AstrBot uses pytest markers to categorize tests:

```python
import pytest

@pytest.mark.unit
def test_unit():
    """Unit test"""
    pass

@pytest.mark.integration
def test_integration():
    """Integration test"""
    pass

@pytest.mark.slow
def test_slow():
    """Slow test"""
    pass

@pytest.mark.platform("telegram")
def test_telegram_specific():
    """Telegram platform specific test"""
    pass

@pytest.mark.provider
def test_provider():
    """Provider test (requires API Key)"""
    pass
```

## Test Configuration File

### pytest.ini

Create `pytest.ini` in your project root:

```ini
[pytest]
asyncio_mode = auto
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
markers =
    unit: Unit tests
    integration: Integration tests
    slow: Slow tests
    platform: Platform adapter tests
    provider: LLM Provider tests
```

## Running Tests

### Run All Tests

```bash
pytest
```

### Run Specific Tests

```bash
# Run a single file
pytest tests/test_my_plugin.py

# Run a single test function
pytest tests/test_my_plugin.py::test_example

# Run tests with specific markers
pytest -m unit
pytest -m "not slow"
```

### Test Coverage

```bash
pytest --cov=astrbot --cov-report=html
```

## Best Practices

1. **Test Isolation**: Each test should run independently without depending on other tests' state
2. **Use Fixtures**: Leverage AstrBot's fixtures to reduce code duplication
3. **Mock External Dependencies**: Use mock tools to simulate external services and avoid real API calls
4. **Clear Test Names**: Test function names should clearly describe what is being tested
5. **Test Edge Cases**: Test not only the happy path but also error conditions

## Example: Testing Plugin Commands

```python
import pytest
from astrbot.api.event import AstrMessageEvent
from astrbot.api.star import Context, Star

class TestMyPlugin:
    @pytest.fixture
    def plugin(self, mock_context):
        """Create plugin instance"""
        from my_plugin import MyPlugin
        return MyPlugin(mock_context)
    
    @pytest.mark.asyncio
    async def test_helloworld_command(self, plugin, mock_event):
        """Test helloworld command"""
        # Set message content
        mock_event.message_str = "/helloworld"
        
        # Call command handler
        result = await plugin.helloworld(mock_event)
        
        # Verify result
        assert result is not None
```

## Related Resources

- [pytest Official Documentation](https://docs.pytest.org/)
- [pytest-asyncio Documentation](https://pytest-asyncio.readthedocs.io/)
- [unittest.mock Documentation](https://docs.python.org/3/library/unittest.mock.html)
