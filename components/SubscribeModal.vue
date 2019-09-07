<template>
  <Popup
    :value="showSubModal"
    @input="$store.commit('closeSubscribeModal')"
    class="text-center p-4"
  >
    <van-image width="200" height="200" src="/qrcode.jpg" />
    <div class="text-sm">
      <div>
        请关注我们的微信公众号
      </div>
      <div>微信号: <span class="text-green">yunbo020</span></div>
      <div>
        获取最新推送
      </div>
    </div>
  </Popup>
</template>
<script>
import { Popup, Image } from 'vant'
export default {
  components: {
    Popup,
    'van-image': Image
  },
  computed: {
    showSubModal() {
      return this.$store.state.showSubscribeModal
    }
  },
  created() {
    // eslint-disable-next-line
    if(this.$auth.loggedIn && !this.$auth.user.isSubscribe){
      this.$store.commit('openSubscribeModal')
    }
  }
}
</script>

<style></style>
