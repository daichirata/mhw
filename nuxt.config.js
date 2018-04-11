module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: "MHW 大剣シミュレーター",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "MHW 大剣 シミュレーター"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      }
    ]
  },

  css: [{ src: "~assets/css/main.scss", lang: "scss" }],

  plugins: ["~plugins/vue-fontawesome"],

  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-117355182-1"
      }
    ]
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      if (isClient) {
        config.entry.vendor.push("babel-polyfill");
      }
    }
  }
};
