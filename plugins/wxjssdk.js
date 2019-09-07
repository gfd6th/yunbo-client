// plugins/after-each.js:

export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if (!sessionStorage.getItem('initLink')) {
      sessionStorage.setItem('initLink', document.URL)
    }

    setTimeout(() => {
      app.$axios
        .$post('wxjssdk', {
          // ios设备，切换路由时候, 使用初次进入的url
          url:
            window.__wxjs_is_wkwebview === true
              ? sessionStorage.getItem('initLink')
              : window.location.protocol +
                '//' +
                window.location.host +
                to.fullPath,
          config: ['updateAppMessageShareData', 'updateTimelineShareData'],
          debug: false
        })
        .then((config) => {
          // eslint-disable-next-line
          wx.config(config)
        })
    }, 400)
  })
}
