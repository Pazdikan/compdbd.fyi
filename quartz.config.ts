import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { defaultImage } from "./quartz/util/og"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "compdbd.fyi",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Viaoda Libre",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fdfaf5", // Pale bone-white (clean background)
          lightgray: "#e2ddd5", // Smoky parchment gray
          gray: "#a49f97", // Aged stone
          darkgray: "#5a5249", // Charcoal-ash
          dark: "#2c2620", // Burnt umber
          secondary: "#c3873f", // Auric gold (primary brand accent)
          tertiary: "#ffbd4a", // Bright auric pop
          highlight: "rgba(255, 189, 74, 0.12)", // Golden glow
          textHighlight: "#ffb93888", // Soft glowing amber
        },
        darkMode: {
          light: "#1b1917", // Near-black with warmth
          lightgray: "#3a3531", // Sooty gray
          gray: "#72695f", // Weathered steel
          darkgray: "#dcd6cd", // Pale ash
          dark: "#f8f6f2", // Bone-white
          secondary: "#ffb938", // Rich auric gold
          tertiary: "#ffe8b1", // Warm ivory gold
          highlight: "rgba(255, 189, 74, 0.08)", // Dim auric shimmer
          textHighlight: "#ffd34a88", // Luminous gold highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        colorScheme: "lightMode", // what colors to use for generating image, same as theme colors from config, valid values are "darkMode" and "lightMode"
        width: 1200, // width to generate with (in pixels)
        height: 630, // height to generate with (in pixels)
        excludeRoot: false, // wether to exclude "/" index path to be excluded from auto generated images (false = use auto, true = use default og image)
        imageStructure: defaultImage, // custom image component to use
      }),
    ],
  },
}

export default config
