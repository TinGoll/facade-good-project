import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Facade Good`,
    description: `Facade Good - производитель качественных фасадов из МДФ и массива, а также комплектующих. У нас вы можете заказать индивидуальный дизайн и получить надежный и эстетически привлекательный продукт по разумной цене.`,
    siteUrl: `https://www.facade-good.ru`,
    image: `/images/icon.png`,
    keywords: `фасады, МДФ, массив, комплектующие, производство, заказать, мебель, качество, индивидуальный подход, гибкая ценовая политика, недорогой товар, доступные цены, экономичные фасады`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Rubik:300,400,500,600", "Abril Fatface"],
        display: "swap",
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Facade Good",
        short_name: "Facade Good",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#161B20",
        // Включает подсказку «Добавить на главный экран» и отключает пользовательский интерфейс браузера (включая кнопку «Назад»)
        display: "minimal-ui",
        // display: "standalone",
        icon: "src/images/icon.png", // Этот путь относится к корню сайта.
        // Необязательный атрибут, обеспечивающий поддержку проверки CORS.
        // Если вы не укажете опцию crossOrigin, CORS будет пропущен для манифеста.
        // Любое недопустимое ключевое слово или пустая строка по умолчанию означает `anonymous`
        // crossOrigin: `use-credentials`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-apollo",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
      __key: "data",
    },
  ],
};

export default config;
