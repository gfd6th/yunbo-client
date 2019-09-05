<template>
  <action-sheet
    v-model="show"
    :actions="actions"
    @select="onSelect"
    cancel-text="取消"
    safe-area-inset-bottom
    close-on-click-action
    title="请选择会员类型"
  />
</template>
<script>
import { ActionSheet } from 'vant'
export default {
  components: {
    ActionSheet
  },

  computed: {
    actions() {
      return [
        {
          name: `年费会员 - ${this.$store.getters.yearly}元`
        },
        { name: `终身会员 - ${this.$store.getters.lifetime}元` }
      ]
    },
    show: {
      get() {
        return this.$store.state.showPaidAction
      },
      set() {
        this.$store.commit('closePaidAction')
      }
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.$axios.$get('settings').then((data) => this.$store.commit('updateSettings', data))
  },
  methods: {
    onSelect(item, index) {
      switch (index) {
        case 0:
          this.payFor('yearly')
          break
        case 1:
          this.payFor('lifetime')
          break
      }
    },
    payFor(plan) {
      this.$axios.$post('/pay/wechat?plan=' + plan).then((data) => {
        // eslint-disable-next-line
        WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回
            window.location.reload()
            // ok，但并不保证它绝对可靠。
          }
        })
      })
    }
  }
}
</script>

<style></style>
