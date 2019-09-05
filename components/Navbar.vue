<template>
  <div>
    <tabbar
      v-model="active"
      safe-area-inset-bottom
      active-color="#48BB78"
      route
    >
      <tabbar-item name="home" icon="home-o" to="/">
        所有课程
      </tabbar-item>
      <tabbar-item name="me" icon="user-circle-o" to="/me">
        我
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
// import contact from '~/assets/img/customer-service.svg'
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      // contact: contact,
      active: 'home',
      show: false
    }
  },
  methods: {
    change() {
      // eslint-disable-next-line
      return
    }
  }
}
</script>
