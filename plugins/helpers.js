import Vue from 'vue'
// eslint-disable-next-line
Vue.prototype.$level = function(l) {
  switch (l) {
    case '初级':
      return '#38B2AC'
    case '中级':
      return '#9F7AEA'
    case '高级':
      return '#F56565'
    default:
      return '#48BB78'
  }
}
