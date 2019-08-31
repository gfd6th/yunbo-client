<template>
  <div>
    <div v-if="hasError">
      获取微信用户失败, 请重新登录
    </div>
    <div v-else style="margin-top:5rem">
      <loading size="24px" vertical color="#48BB78">
        登录中...
      </loading>
    </div>
  </div>
</template>

<script>
import { Loading } from 'vant'
export default {
  components: {
    Loading
  },
  computed: {
    hasError() {
      return !!this.$route.params.error
    }
  },
  created() {
    if (!this.hasError) this.socialLogin('wechat')
  },
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.baseUrl}api/auth/login/${service}`
    }
  }
}
</script>
