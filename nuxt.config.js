export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '云泊硬笔',
    meta: [
      {
        charset: 'utf-8'
      },

      {
        hid: 'description',
        name: 'description',
        content: '广州番禺云泊硬笔, 小学初中生硬笔书法课程视频'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no,viewport-fit=cover" '
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/vant@2.0/lib/index.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css'
      }
    ],
    script: [
      {
        src: 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
        async: true,
        defer: true
      }
    ]
  },

  build: {
    transpile: ['vue-clamp', 'resize-detector'],
    publicPath: 'http://pic.vifashion.cn/cdn'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://yunbo.api.vifashion.cn/',
    shareCover: 'http://placehold.it/100/100'
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000/'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#48BB78'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vant',
    '@/plugins/helpers',
    {
      src: '~/plugins/wxjssdk.js',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/auth'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'accesson_token'
          },
          user: {
            url: 'me',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            method: 'get',
            url: 'auth/logout'
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      home: '/'
    }
    // plugins: ['./plugins/auth']
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // host: 'http://locahost:8080',
    // prefix: '/api',
    baseURL: 'http://yunbo.api.vifashion.cn/api'
    // proxy: true // Can be also an object with default options
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:8080', // api主机
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
  /*
   ** Build configuration
   */
  // build: {
  /*
   ** You can extend webpack config here
   */
  // extend(config, ctx) {}
  // }
}
