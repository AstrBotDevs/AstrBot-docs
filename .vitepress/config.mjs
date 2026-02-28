import { defineConfig } from "vitepress";
import { head } from "./config/head";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AstrBot",
  description: "AstrBot",
  head: head,

  rewrites: {
    'zh/:rest*': ':rest*'
  },

  sitemap: {
    hostname: "https://docs.astrbot.app",
  },

  lastUpdated: true,
  ignoreDeadLinks: true,

  locales: {
    root: {
      label: "简体中文",
      lang: "zh-Hans",
      themeConfig: {
        nav: [
          { text: "主页", link: "/" },
          { text: "开始", link: "/what-is-astrbot" },
          { text: "博客", link: "https://blog.astrbot.app" },
          { text: "路线图", link: "https://astrbot.featurebase.app/roadmap" },
          { text: "HTTP API", link: "https://docs.astrbot.app/scalar.html" },
        ],
        sidebar: [
          {
            text: "简介",
            items: [
              { text: "什么是 AstrBot", link: "/what-is-astrbot" },
              { text: "社区", link: "/community" },
              { text: "常见问题", link: "/faq" },
            ],
          },
          {
            text: "部署",
            base: "/deploy",
            collapsed: false,
            items: [
              {
                text: "部署 AstrBot",
                base: "/deploy/astrbot",
                collapsed: false,
                items: [
                  { text: "包管理器部署", link: "/package" },
                  { text: "雨云一键云部署", link: "/rainyun" },
                  { text: "启动器一键部署", link: "/windows" },
                  { text: "Docker 部署", link: "/docker" },
                  { text: "Kubernetes 部署", link: "/kubernetes" },
                  { text: "宝塔面板部署", link: "/btpanel" },
                  { text: "1Panel 部署", link: "/1panel" },
                  { text: "手动部署", link: "/cli" },
                  {
                    text: "其他部署方式",
                    link: "/other-deployments",
                    collapsed: true,
                    items: [
                      { text: "CasaOS 部署", link: "/casaos" },
                      { text: "优云智算 GPU 部署", link: "/compshare" },
                      { text: "社区提供的部署方式", link: "/community-deployment" },
                    ],
                  },
                ],
              },
              {
                text: "接入消息平台",
                base: "/deploy/platform",
                collapsed: false,
                items: [
                  {
                    text: "QQ 官方机器人",
                    base: "/deploy/platform/qqofficial",
                    collapsed: true,
                    items: [
                      { text: "Webhook 方式", link: "/webhook" },
                      { text: "Websockets 方式", link: "/websockets" },
                    ],
                  },
                  { text: "企微应用", link: "/wecom" },
                  { text: "企微智能机器人", link: "/wecom_ai_bot" },
                  { text: "微信公众号", link: "/weixin-official-account" },
                  { text: "飞书", link: "/lark" },
                  { text: "钉钉", link: "/dingtalk" },
                  { text: "Telegram", link: "/telegram" },
                  { text: "LINE", link: "/line" },
                  { text: "Slack", link: "/slack" },
                  { text: "Misskey", link: "/misskey" },
                  { text: "Discord", link: "/discord" },
                  {
                    text: "OneBot v11",
                    base: "/deploy/platform/aiocqhttp",
                    collapsed: true,
                    items: [
                      { text: "NapCat", link: "/napcat" },
                      { text: "Lagrange", link: "/lagrange" },
                      { text: "其他端", link: "/others" },
                    ],
                  },
                  {
                    text: "Satori",
                    base: "/deploy/platform/satori",
                    collapsed: true,
                    items: [
                      { text: "使用 LLOneBot", link: "/llonebot" },
                      { text: "使用 server-satori", link: "/server-satori" },
                    ],
                  },
                  {
                    text: "社区提供",
                    collapsed: false,
                    items: [
                      { text: "Matrix", link: "/matrix" },
                      { text: "KOOK", link: "/kook" },
                      { text: "VoceChat", link: "/vocechat" },
                    ],
                  },
                ],
              },
              {
                text: "支持我们",
                link: "/when-deployed",
              },
            ],
          },
          {
            text: "配置",
            base: "/config",
            collapsed: false,
            items: [
              {
                text: "配置模型服务商",
                base: "/config/providers",
                collapsed: true,
                items: [
                  { text: "✨ 接入模型服务", link: "/start" },
                  { text: "NewAPI", link: "/newapi" },
                  { text: "AIHubMix", link: "/aihubmix" },
                  { text: "PPIO 派欧云", link: "/ppio" },
                  { text: "硅基流动", link: "/siliconflow" },
                  { text: "小马算力", link: "/tokenpony" },
                  { text: "302.AI", link: "/302ai" },
                  { text: "Ollama", link: "/provider-ollama" },
                  { text: "LMStudio", link: "/provider-lmstudio" },
                ],
              },
              {
                text: "配置 Agent 执行器",
                base: "/config/agent-runners",
                collapsed: true,
                items: [
                  { text: "内置 Agent 执行器", link: "/astrbot-agent-runner" },
                  { text: "Dify", link: "/dify" },
                  { text: "扣子 Coze", link: "/coze" },
                  { text: "阿里云百炼应用", link: "/dashscope" },
                ],
              },
              {
                text: "AstrBot 配置文件",
                link: "/astrbot-config",
              },
            ],
          },
          {
            text: "使用",
            base: "/use",
            collapsed: true,
            items: [
              { text: "WebUI", link: "/webui" },
              { text: "插件", link: "/plugin" },
              { text: "内置指令", link: "/command" },
              { text: "工具使用 Tools", link: "/function-calling" },
              { text: "技能 Skills", link: "/skills" },
              { text: "SubAgent 编排", link: "/subagent" },
              { text: "主动型 Agent 能力", link: "/proactive-agent" },
              { text: "MCP", link: "/mcp" },
              { text: "网页搜索", link: "/websearch" },
              { text: "知识库", link: "/knowledge-base" },
              { text: "自定义规则", link: "/custom-rules" },
              { text: "Agent 执行器", link: "/agent-runner" },
              { text: "统一 Webhook 模式", link: "/unified-webhook" },
              { text: "自动上下文压缩", link: "/context-compress" },
              { text: "Agent 沙箱环境", link: "/astrbot-agent-sandbox" },
              { text: "(旧) 沙箱化代码执行器", link: "/code-interpreter" },
            ],
          },
          {
            text: "开发",
            base: "/dev",
            collapsed: true,
            items: [
              {
                text: "插件开发",
                base: "/dev/star",
                collapsed: true,
                items: [
                  { text: "🌠 从这里开始", link: "/plugin-new" },
                  { text: "最小实例", link: "/guides/simple" },
                  { text: "接收消息事件", link: "/guides/listen-message-event" },
                  { text: "发送消息", link: "/guides/send-message" },
                  { text: "插件配置", link: "/guides/plugin-config" },
                  { text: "调用 AI", link: "/guides/ai" },
                  { text: "存储", link: "/guides/storage" },
                  { text: "文转图", link: "/guides/html-to-pic" },
                  { text: "会话控制器", link: "/guides/session-control" },
                  { text: "杂项", link: "/guides/other" },
                  { text: "发布插件", link: "/plugin-publish" },
                  { text: "插件指南（旧）", link: "/plugin" },
                ],
              },
              {
                text: "接入平台适配器",
                link: "/plugin-platform-adapter",
              },
              {
                text: "AstrBot HTTP API",
                link: "/openapi",
              },
            ],
          },
          {
            text: "其他",
            base: "/others",
            collapsed: true,
            items: [
              { text: "自部署文转图", link: "/self-host-t2i" },
              { text: "插件下载不了?试试自建 GitHub 加速服务", link: "/github-proxy" },
            ],
          },
          {
            text: "开源之夏",
            base: "/ospp",
            collapsed: true,
            items: [{ text: "OSPP 2025", link: "/2025" }],
          },
        ],
        outline: {
          level: 'deep',
          label: '目录',
        },
        darkModeSwitchLabel: '切换日光/暗黑模式',
        sidebarMenuLabel: '文章',
        returnToTopLabel: '返回顶部',
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        editLink: {
          pattern: 'https://github.com/AstrBotdevs/AstrBot-docs/edit/v4/:path',
          text: '发现文档有问题？在 GitHub 上编辑此页',
        },
        logo: '/logo_prod.png',
        socialLinks: [
          { icon: "github", link: "https://github.com/AstrBotDevs/AstrBot" },
        ],
        footer: {
          message: 'Deployed on&nbsp' +
            '<a href="https://www.rainyun.com/NjY3OTQ5_" class="deployment-link" style="display: inline-flex; align-items: center;">' +
            '<img src="https://www.rainyun.com/img/logo.d193755d.png" width="50" alt="Rainyun Logo">' +
            '</a>',
        }
      }
    },
    en: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Get Started", link: "/en/what-is-astrbot" },
          { text: "HTTP API", link: "https://docs.astrbot.app/scalar.html" },
        ],
        sidebar: [
          {
            text: "Introduction",
            items: [
              { text: "What is AstrBot", link: "/en/what-is-astrbot" },
              { text: "Community", link: "/en/community" },
              { text: "FAQ", link: "/en/faq" },
            ],
          },
          {
            text: "Deployment",
            base: "/en/deploy",
            collapsed: false,
            items: [
              {
                text: "Installation",
                base: "/en/deploy/astrbot",
                collapsed: false,
                items: [
                  { text: "Package Manager", link: "/package" },
                  { text: "Docker", link: "/docker" },
                  { text: "Kubernetes", link: "/kubernetes" },
                  { text: "Manual", link: "/cli" },
                  { text: "BT Panel", link: "/btpanel" },
                  { text: "1Panel", link: "/1panel" },
                  {
                    text: "Other Deployments",
                    link: "/other-deployments",
                    collapsed: true,
                    items: [
                      { text: "CasaOS", link: "/casaos" },
                    ],
                  },
                ],
              },
              {
                text: "Configure Bots",
                base: "/en/deploy/platform",
                collapsed: false,
                items: [
                  {
                    text: "QQ Official API",
                    base: "/en/deploy/platform/qqofficial",
                    collapsed: true,
                    items: [
                      { text: "Webhook Method", link: "/webhook" },
                      { text: "Websockets Method", link: "/websockets" },
                    ],
                  },
                  {
                    text: "OneBot v11",
                    base: "/en/deploy/platform/aiocqhttp",
                    collapsed: true,
                    items: [
                      { text: "NapCat", link: "/napcat" },
                      { text: "Lagrange", link: "/lagrange" },
                      { text: "Other Clients", link: "/others" },
                    ],
                  },
                  { text: "WeCom Application", link: "/wecom" },
                  { text: "WeCom AI Bot", link: "/wecom_ai_bot" },
                  { text: "WeChat Official Account", link: "/weixin-official-account" },
                  { text: "Lark", link: "/lark" },
                  { text: "LINE", link: "/line" },
                  { text: "DingTalk", link: "/dingtalk" },
                  { text: "Telegram", link: "/telegram" },
                  { text: "Slack", link: "/slack" },
                  { text: "Misskey", link: "/misskey" },
                  { text: "Discord", link: "/discord" },
                  {
                    text: "Community-provided",
                    collapsed: false,
                    items: [
                      { text: "Matrix", link: "/matrix" },
                      { text: "KOOK", link: "/kook" },
                      { text: "VoceChat", link: "/vocechat" },
                    ],
                  },
                  {
                    text: "Satori",
                    base: "/en/deploy/platform/satori",
                    collapsed: true,
                    items: [
                      { text: "Using LLOneBot", link: "/llonebot" },
                      { text: "Using server-satori", link: "/server-satori" },
                    ],
                  },
                ],
              },
              {
                text: "After Deployment...",
                link: "/when-deployed",
              },
            ],
          },
          {
            text: "Configuration",
            base: "/en/config",
            collapsed: false,
            items: [
              {
                text: "Integrating LLM Services",
                base: "/en/config/providers",
                collapsed: true,
                items: [
                  { text: "✨ Connecting LLM Services", link: "/start" },
                  { text: "NewAPI", link: "/newapi" },
                  { text: "AIHubMix", link: "/aihubmix" },
                  { text: "PPIO Cloud", link: "/ppio" },
                  { text: "SiliconFlow", link: "/siliconflow" },
                  { text: "TokenPony", link: "/tokenpony" },
                  { text: "302.AI", link: "/302ai" },
                  { text: "Ollama", link: "/provider-ollama" },
                  { text: "LMStudio", link: "/provider-lmstudio" },
                ],
              },
              {
                text: "Integrating Agent Runners",
                base: "/en/config/agent-runners",
                collapsed: true,
                items: [
                  { text: "Built-in Agent Runner", link: "/astrbot-agent-runner" },
                  { text: "Dify", link: "/dify" },
                  { text: "Coze", link: "/coze" },
                  { text: "Alibaba Bailian", link: "/dashscope" },
                ],
              },
              {
                text: "AstrBot Configuration File",
                link: "/astrbot-config",
              },
            ],
          },
          {
            text: "Usage",
            base: "/en/use",
            collapsed: true,
            items: [
              { text: "WebUI", link: "/webui" },
              { text: "Plugins", link: "/plugin" },
              { text: "Built-in Commands", link: "/command" },
              { text: "Tool Use", link: "/function-calling" },
              { text: "Anthropic Skills", link: "/skills" },
              { text: "SubAgent Orchestration", link: "/subagent" },
              { text: "Proactive Tasks", link: "/proactive-agent" },
              { text: "MCP", link: "/mcp" },
              { text: "Web Search", link: "/websearch" },
              { text: "Knowledge Base", link: "/knowledge-base" },
              { text: "Custom Rules", link: "/custom-rules" },
              { text: "Agent Runner", link: "/agent-runner" },
              { text: "Unified Webhook Mode", link: "/unified-webhook" },
              { text: "Auto Context Compression", link: "/context-compress" },
              { text: "Agent Sandbox", link: "/astrbot-agent-sandbox" },
              { text: "(Legacy) Sandboxed Code Interpreter", link: "/code-interpreter" },
            ],
          },
          {
            text: "Development",
            base: "/en/dev",
            collapsed: true,
            items: [
              {
                text: "Plugin Development",
                base: "/en/dev/star",
                collapsed: true,
                items: [
                  { text: "🌠 Getting Started", link: "/plugin-new" },
                  { text: "Minimal Example", link: "/guides/simple" },
                  { text: "Listen to Message Events", link: "/guides/listen-message-event" },
                  { text: "Send Messages", link: "/guides/send-message" },
                  { text: "Plugin Configuration", link: "/guides/plugin-config" },
                  { text: "AI", link: "/guides/ai" },
                  { text: "Storage", link: "/guides/storage" },
                  { text: "HTML to Image", link: "/guides/html-to-pic" },
                  { text: "Session Control", link: "/guides/session-control" },
                  { text: "Publish Plugin", link: "/plugin-publish" },
                ],
              },
              {
                text: "Platform Adapter Integration",
                link: "/plugin-platform-adapter",
              },
              {
                text: "AstrBot HTTP API",
                link: "/openapi",
              },
            ],
          },
          {
            text: "Others",
            base: "/en/others",
            collapsed: true,
            items: [
              { text: "Self-hosted HTML to Image", link: "/self-host-t2i" },
            ],
          },
          {
            text: "Open Source Summer",
            base: "/en/ospp",
            collapsed: true,
            items: [{ text: "OSPP 2025", link: "/2025" }],
          },
        ],
        outline: {
          level: 'deep',
          label: 'On this page',
        },
        darkModeSwitchLabel: 'Toggle dark mode',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        editLink: {
          pattern: 'https://github.com/AstrBotdevs/AstrBot-docs/edit/v4/:path',
          text: 'Edit this page on GitHub',
        },
        logo: '/logo_prod.png',
        socialLinks: [
          { icon: "github", link: "https://github.com/AstrBotDevs/AstrBot" },
        ],
        footer: {
          message: 'Deployed on&nbsp' +
            '<a href="https://www.rainyun.com/NjY3OTQ5_" class="deployment-link" style="display: inline-flex; align-items: center;">' +
            '<img src="https://www.rainyun.com/img/logo.d193755d.png" width="50" alt="Rainyun Logo">' +
            '</a>',
        }
      }
    },
  },

  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
  }
});
