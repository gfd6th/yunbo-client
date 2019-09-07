<template>
  <Popup
    :value="$store.state.showLoginModal"
    @input="$store.commit('closeLoginModal')"
    class="text-center p-4"
  >
    <template v-if="$auth.loggedIn && !$auth.user.isPremium">
      <p>该课程仅供付费用户查看</p>
      <Button @click="showPaidAction" type="primary" block>
        成为付费用户
      </Button>
    </template>
    <template v-if="!$auth.loggedIn">
      <p>请登录后查看</p>
      <Button @click="login" icon="/wechat.svg" type="primary" block>
        使用微信登录
      </Button>
    </template>
  </Popup>
</template>

<script>
import { Button, Popup } from 'vant'
export default {
  components: {
    Button,
    Popup
  },
  // props: ['show'],

  methods: {
    login() {
      this.$store.commit('closeLoginModal')
      this.$router.push('/auth/login?redirect=' + this.$route.fullPath)
    },
    showPaidAction() {
      this.$store.commit('showPaidAction')
      this.$store.commit('closeLoginModal')
    }
  }
}
</script>

<style></style>
