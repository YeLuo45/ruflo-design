import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Ruflo Design",
  description: "Ruflo 多智能体编排系统架构设计文档站",
  lang: "zh-CN",
  base: "/ruflo-design/",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "架构", link: "/architecture" },
      { text: "Agent", link: "/agents" },
      { text: "Swarm", link: "/swarm" },
      { text: "Memory", link: "/memory" },
      { text: "插件", link: "/plugins" },
      { text: "CLI", link: "/cli" },
      { text: "安全", link: "/security" },
    ],
    sidebar: [
      {
        text: "文档",
        items: [
          { text: "首页", link: "/" },
          { text: "架构分析", link: "/architecture" },
          { text: "Agent 系统", link: "/agents" },
          { text: "Swarm 编排", link: "/swarm" },
          { text: "Memory 系统", link: "/memory" },
          { text: "插件生态", link: "/plugins" },
          { text: "CLI 参考", link: "/cli" },
          { text: "安全设计", link: "/security" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/YeLuo45/ruflo-design" },
    ],
    footer: {
      message: "基于 Ruflo 开源项目构建",
      copyright: "Copyright © 2025-present Ruflo Contributors",
    },
  },
});
