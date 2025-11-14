import { defineConfig, type DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
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
    items: deploy(),
  },
  {
    text: "配置",
    base: "/config",
    collapsed: false,
    items: config(),
  },
  {
    text: "使用",
    base: "/use",
    collapsed: true,
    items: use(),
  },
  {
    text: "开发",
    base: "/dev",
    collapsed: true,
    items: [
      // {
      //     text: "核心代码解释",
      //     base: "/dev/core",
      //     collapsed: true,
      //     items: [
      //         { text: "整体架构", link: "/overall_architecture" },
      //         { text: "运行流程", link: "/overall_operation_process" },
      //     ],
      // },
      {
        text: "插件开发",
        base: "/dev/star",
        collapsed: true,
        items: dev_star(),
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
      {
        text: "自部署文转图",
        link: "/self-host-t2i",
      },
      {
        text: "插件下载不了?试试自建 GitHub 加速服务",
        link: "/github-proxy",
      },
    ],
  },
    {
    text: "开源之夏",
    base: "/ospp",
    collapsed: true,
    items: [{ text: "OSPP 2025", link: "/2025" }],
  },
];

function deploy(): DefaultTheme.SidebarItem[] {
  return [
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
        // { text: "😌 社区提供的部署脚本", link: "/linux-one" },
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
      text: "部署好后...",
      link: "/when-deployed",
    },
  ];
}

function config(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "接入大模型服务",
      base: "/config/providers",
      collapsed: true,
      items: [
        { text: "PPIO 派欧云", link: "/ppio" },
        { text: "硅基流动", link: "/siliconflow" },
        { text: "小马算力", link: "/tokenpony" },
        { text: "302.AI", link: "/302ai" },
        {
          text: "Dify",
          link: "/dify",
        },
        { text: "Coze", link: "/coze" },
        {
          text: "阿里云百炼应用",
          link: "/dashscope",
        },
        {
          text: "Ollama",
          link: "/provider-ollama",
        },
        {
          text: "LMStudio",
          link: "/provider-lmstudio",
        },
        {
          text: "OneAPI",
          link: "/oneapi",
        },
      ],
    },
    {
      text: "AstrBot 配置文件",
      link: "/astrbot-config",
    },
  ];
}

function use(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "WebUI",
      link: "/webui",
    },
    {
      text: "插件",
      link: "/plugin",
    },
    {
      text: "内置指令",
      link: "/command",
    },
    {
      text: "函数调用",
      link: "/function-calling",
    },
    {
      text: "MCP",
      link: "/mcp",
    },
    {
      text: "网页搜索",
      link: "/websearch",
    },
    {
      text: "知识库",
      link: "/knowledge-base",
    },
    {
      text: "沙箱化代码执行器(beta)",
      link: "/code-interpreter",
    },
    {
      text: "配置 Whisper 语音转文字",
      link: "/whisper",
    },
    {
      text: "配置文字转语音(TTS)",
      link: "/tts",
    },
  ];
}

function dev_star(): DefaultTheme.SidebarItem[] {
  return [
    { text: "插件开发指南", link: "/plugin" },
    {
      text: "类",
      base: "/dev/star/resources",
      collapsed: true,
      items: [
        { text: "AstrMessageEvent", link: "/astr_message_event" },
        { text: "AstrBotMessage", link: "/astrbot_message" },
        { text: "MessageType", link: "/message_type" },
        { text: "MessageMember", link: "/message_member" },
        { text: "Context", link: "/context" },
        { text: "Star", link: "/star" },
        { text: "StarMetadata", link: "/star_metadata" },
        { text: "PlatformMetadata", link: "/platform_metadata" },
      ],
    },
  ];
}
