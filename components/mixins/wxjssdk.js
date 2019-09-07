export default {
  mounted() {
    this.configwx()
  },
  methods: {
    configwx(index) {
      const shareLink = this.shareLink(index)
      // eslint-disable-next-line
      wx.ready(() => {
        // 需在用户可能点击分享按钮前就先调用
        console.log(shareLink)
        // alert(shareLink)

        // eslint-disable-next-line
        wx.updateAppMessageShareData({
          title: this.title, // 分享标题
          desc: this.desc, // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.cover || process.env.shareCover // 分享图标
        })

        // eslint-disable-next-line
        wx.updateTimelineShareData({
          title: this.title, // 分享标题
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.cover || process.env.shareCover // 分享图标
        })
      })
    },
    shareLink(index) {
      const query = this.$router.currentRoute.query
      let queryStr = ''
      if (query.lesson) {
        queryStr = '?lesson=' + query.lesson
      }
      if (index) {
        queryStr = '?lesson=' + index
      }

      return window.location.origin + window.location.pathname + queryStr
    }
  }
}
