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
                collapsed: true,
                items: [
                  { text: "🦈 Docker 部署", link: "/docker" },
                  { text: "☁️ 雨云一键云部署(NEW)", link: "/rainyun" },
                  { text: "💻 Windows 一键部署", link: "/windows" },
                  { text: "👍 手动部署", link: "/cli" },
                  { text: "😁 宝塔面板部署", link: "/btpanel" },
                  { text: "🥇 1Panel 部署", link: "/1panel" },
                  { text: "😊 CasaOS 部署", link: "/casaos" },
                  { text: "🤗 安卓 Termux 部署", link: "/termux" },
                  { text: "🍉 优云智算 GPU 部署", link: "/compshare" },
                  { text: "⭐️ 社区提供的部署方式", link: "/community-deployment" },
                ],
              },
              {
                text: "接入到消息平台",
                base: "/deploy/platform",
                collapsed: true,
                items: [
                  {
                    text: "QQ 官方接口",
                    base: "/deploy/platform/qqofficial",
                    collapsed: true,
                    items: [
                      { text: "Webhook 方式", link: "/webhook" },
                      { text: "Websockets 方式", link: "/websockets" },
                    ],
                  },
                  {
                    text: "QQ 个人号",
                    base: "/deploy/platform/aiocqhttp",
                    collapsed: true,
                    items: [
                      { text: "使用 NapCat", link: "/napcat" },
                      { text: "使用 Lagrange", link: "/lagrange" },
                      { text: "使用其他端", link: "/others" },
                    ],
                  },
                  { text: "企微应用", link: "/wecom" },
                  { text: "企微智能机器人", link: "/wecom_ai_bot" },
                  { text: "微信公众平台", link: "/weixin-official-account" },
                  {
                    text: "微信个人号",
                    base: "/deploy/platform/wechat",
                    collapsed: true,
                    items: [{ text: "使用 WeChatPadPro", link: "/wechatpadpro" }],
                  },
                  { text: "飞书", link: "/lark" },
                  { text: "钉钉", link: "/dingtalk" },
                  { text: "Telegram", link: "/telegram" },
                  { text: "Slack", link: "/slack" },
                  { text: "Misskey", link: "/misskey" },
                  { text: "Discord", link: "/discord" },
                  { text: "KOOK", link: "/kook" },
                  { text: "VoceChat", link: "/vocechat" },
                  {
                    text: "Satori",
                    base: "/deploy/platform/satori",
                    collapsed: true,
                    items: [
                      { text: "使用 LLOneBot", link: "/llonebot" },
                      { text: "使用 server-satori", link: "/server-satori" },
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
                text: "接入大模型服务",
                base: "/config/providers",
                collapsed: true,
                items: [
                  { text: "PPIO 派欧云", link: "/ppio" },
                  { text: "硅基流动", link: "/siliconflow" },
                  { text: "小马算力", link: "/tokenpony" },
                  { text: "302.AI", link: "/302ai" },
                  { text: "Dify", link: "/dify" },
                  { text: "Coze", link: "/coze" },
                  { text: "阿里云百炼应用", link: "/dashscope" },
                  { text: "Ollama", link: "/provider-ollama" },
                  { text: "LMStudio", link: "/provider-lmstudio" },
                  { text: "OneAPI", link: "/oneapi" },
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
              { text: "函数调用", link: "/function-calling" },
              { text: "MCP", link: "/mcp" },
              { text: "网页搜索", link: "/websearch" },
              { text: "知识库", link: "/knowledge-base" },
              { text: "沙箱化代码执行器(beta)", link: "/code-interpreter" },
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
                text: "Deploy AstrBot",
                base: "/en/deploy/astrbot",
                collapsed: true,
                items: [
                  { text: "🦈 Docker Deployment", link: "/docker" },
                  { text: "👍 Manual Deployment", link: "/cli" },
                  { text: "😁 BT Panel Deployment", link: "/btpanel" },
                  { text: "🥇 1Panel Deployment", link: "/1panel" },
                  { text: "😊 CasaOS Deployment", link: "/casaos" },
                ],
              },
              {
                text: "Connect to Messaging Platforms",
                base: "/en/deploy/platform",
                collapsed: true,
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
                    text: "QQ Personal Account",
                    base: "/en/deploy/platform/aiocqhttp",
                    collapsed: true,
                    items: [
                      { text: "Using NapCat", link: "/napcat" },
                      { text: "Using Lagrange", link: "/lagrange" },
                      { text: "Using Other Clients", link: "/others" },
                    ],
                  },
                  { text: "WeCom Application", link: "/wecom" },
                  { text: "WeCom AI Bot", link: "/wecom_ai_bot" },
                  { text: "WeChat Official Account", link: "/weixin-official-account" },
                  {
                    text: "WeChat Personal Account",
                    base: "/en/deploy/platform/wechat",
                    collapsed: true,
                    items: [{ text: "Using WeChatPadPro", link: "/wechatpadpro" }],
                  },
                  { text: "Lark", link: "/lark" },
                  { text: "DingTalk", link: "/dingtalk" },
                  { text: "Telegram", link: "/telegram" },
                  { text: "Slack", link: "/slack" },
                  { text: "Misskey", link: "/misskey" },
                  { text: "Discord", link: "/discord" },
                  { text: "KOOK", link: "/kook" },
                  { text: "VoceChat", link: "/vocechat" },
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
                  { text: "PPIO Cloud", link: "/ppio" },
                  { text: "SiliconFlow", link: "/siliconflow" },
                  { text: "TokenPony", link: "/tokenpony" },
                  { text: "302.AI", link: "/302ai" },
                  { text: "Dify", link: "/dify" },
                  { text: "Coze", link: "/coze" },
                  { text: "Alibaba Cloud Bailian", link: "/dashscope" },
                  { text: "Ollama", link: "/provider-ollama" },
                  { text: "LMStudio", link: "/provider-lmstudio" },
                  { text: "OneAPI", link: "/oneapi" },
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
              { text: "Function Calling", link: "/function-calling" },
              { text: "MCP", link: "/mcp" },
              { text: "Web Search", link: "/websearch" },
              { text: "Knowledge Base", link: "/knowledge-base" },
              { text: "Sandboxed Code Interpreter (beta)", link: "/code-interpreter" },
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
                  { text: "HTML to Image", link: "/guides/html-to-pic" },
                  { text: "Session Control", link: "/guides/session-control" },
                  { text: "Publish Plugin", link: "/plugin-publish" },
                ],
              },
              {
                text: "Platform Adapter Integration",
                link: "/plugin-platform-adapter",
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
