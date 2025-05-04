// @ts-nocheck
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Rachadores",
  tagline: "Rachadores",
  favicon: "img/logo_modo_claro.png",

  // Set the production url of your site here
  url: 'https://Inteli-College.github.io',
  baseUrl: '/2025-1B-T12-EC06-G05/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Inteli-College", // Usually your GitHub org/user name.
  projectName: "2025-1B-T12-EC06-G05", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo_g5.png",
      navbar: {
        title: "Rachadores",
        logo: {
          alt: 'Logo Rachadores',
          src: 'img/logo_modo_claro.png',       // Logo para modo claro
          srcDark: 'img/logo_modo_escuro.png',    // Logo para modo escuro
        },
        items: [
          {
            href: "https://github.com/Inteli-College/2025-1B-T12-EC06-G05",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Inteli-College/2025-1B-T12-EC06-G05",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Rachadores, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
