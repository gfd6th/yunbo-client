export default {
  mounted() {
    this.getWxjssdk()
  },
  methods: {
    getWxjssdk(index = null) {
      const shareLink = this.shareLink(index)
      // alert(shareLink)
      this.$axios
        .$post('wxjssdk', {
          url: shareLink,
          config: ['updateAppMessageShareData', 'updateTimelineShareData']
        })
        .then((config) => {
          // console.log(config)
          // eslint-disable-next-line
          // wx.config(config)
          // const _this = this
          // eslint-disable-next-line
          wx.ready(() => {
            // 需在用户可能点击分享按钮前就先调用
            console.log(shareLink)
            // eslint-disable-next-line
            wx.updateAppMessageShareData({
              title: this.title, // 分享标题
              desc: this.desc, // 分享描述
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.cover || process.env.shareCover // 分享图标
            })
            // eslint-disable-next-line

            // eslint-disable-next-line
            wx.updateTimelineShareData({
              title: this.title, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.cover || process.env.shareCover // 分享图标
            })
          })
        })
    },
    shareLink(index) {
      let href = this.$router.currentRoute.fullPath
      // console.log(href, this.$router.history.current)
      if (
        href.indexOf('groupmessage') > -1 ||
        href.indexOf('singlemessage') > -1 ||
        href.indexOf('timeline') > -1
      ) {
        href = href.replace(
          /from=(groupmessage|singlemessage|timeline)&isappinstalled=(0|1)&/,
          ''
        )
      }
      if (index && href.indexOf('lesson=') > -1) {
        href = href.replace(/lesson=\d+/, 'lesson=' + index)
      }

      return 'http://yunbo.vifashion.cn' + href
    }
  }
}
