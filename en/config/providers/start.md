# Connecting Model Services

AstrBot supports the native API formats of OpenAI, Google GenAI, and Anthropic. You can connect any model service provider that conforms to one of these three API formats.

For example, you may choose to connect model services provided by (but not limited to):

- Official OpenAI model services ([OpenAI](https://openai.com/))
- Official Anthropic model services ([Anthropic](https://www.anthropic.com/))
- Google's Gemini model services via Google Cloud ([Google Cloud](https://cloud.google.com/))
- OpenRouter model services ([OpenRouter](https://openrouter.ai/))

Using DeepSeek as an example, assuming you have registered and logged in to a DeepSeek account, the steps to connect are:

1. Go to the DeepSeek Console (https://platform.deepseek.com/).
2. Click the "API Keys" menu in the left sidebar, create a new API Key, and copy the key.
3. Click the "API Documentation" link near the bottom of the left sidebar to open the API documentation page.
4. On the API documentation page, find the section about the "OpenAI-compatible interface" and note the API Base URL, for example `https://api.deepseek.com/v1`. (If there is no `/v1`, please add `/v1`.)
5. Open the AstrBot Console -> Service Providers page, click Add Provider, find and click `OpenAI` (if the provider type you want to connect is listed, prefer clicking that type; for some providers like DeepSeek we provide optimized adapter support). Paste the API Key into the `API Key` field of the form and paste the API Base URL into the `API Base URL` field.
6. Click Get Model List, find the model you want to use, click the + button on the right, then toggle the switch that appears on the right to enable it.
7. Go to the Configuration page, find the conversational model, click the selection button on the right, choose the provider and model you just added, then click the Save Configuration button at the bottom-right of the screen.