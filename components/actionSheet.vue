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
  data() {
    return {
      actions: [{ name: '年费会员 - 600元' }, { name: '终身会员 - 2000元' }]
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.state.showPaidAction
      },
      set() {
        this.$store.commit('closePaidAction')
      }
    }
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
            // ok，但并不保证它绝对可靠。
          }
        })
      })
    }
  }
}
</script>

<style></style>
