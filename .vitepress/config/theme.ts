import type { DefaultTheme } from 'vitepress';
import { sidebar } from './sidebar';

export const themeConfig: DefaultTheme.Config = {

    nav: [
        { text: "主页", link: "/" },
        { text: "开始", link: "/what-is-astrbot" },
        { text: "v4 版本文档(beta)", link: "https://docs-v4.astrbot.app" },
    ],
    sidebar,

    logo: '/logo.png',
    outline: {
        level: 'deep',
        label: '目录',
    },
    darkModeSwitchLabel: '切换日光/暗黑模式',
    sidebarMenuLabel: '文章',
    returnToTopLabel: '返回顶部',

    lastUpdated: {
        text: "最后更新于",
    },

    docFooter: {
        prev: '上一篇',
        next: '下一篇'
    },

    editLink: {
        pattern: 'https://github.com/AstrBotdevs/AstrBot-docs/edit/v2/:path',
        text: '不妥之处，敬请雅正'
    },

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

    socialLinks: [
        { icon: "github", link: "https://github.com/Soulter/AstrBot" },
    ],

    footer: {
        message: 'Deployed on&nbsp' +
            '<a href="https://www.rainyun.com/NjY3OTQ1_" class="deployment-link" style="display: inline-flex; align-items: center;">' +
            '<img src="https://www.rainyun.com/img/logo.d193755d.png" width="50" alt="Rainyun Logo">' +
            '</a>',
    }
}