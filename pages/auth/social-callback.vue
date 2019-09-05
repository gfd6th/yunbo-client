<template>
  <div style="margin-top: 3rem">
    <div v-if="registered" class="text-center">
      <van-loading size="24px" vertical color="#48BB78">
        加载中...
      </van-loading>
    </div>

    <div v-else>
      <h1 class="text-center pt-2">
        请完善资料
      </h1>

      <div class="text-center py-4">
        <van-image :src="avatar" round width="5rem" height="5rem" />
      </div>

      <div style="width: 70%" class="bg-white border box-shadow mx-auto p-4">
        <Field
          ref="code"
          v-model="code"
          @click-right-icon="$toast('可向群主获取口令')"
          @input="checkCode"
          :error-message="codeError"
          :class="codeError !== '口令错误' ? 'codeOk' : ''"
          size="large"
          required
          label-width="50"
          clearable
          label="口令"
          right-icon="question-o"
        />
        <Field
          v-model="name"
          size="large"
          required
          label-width="50"
          clearable
          label="姓名"
        />

        <Field
          ref="phone"
          v-model="phone"
          @input="checkPhone"
          :error-message="phoneError"
          size="large"
          type="tel"
          required
          label-width="50"
          clearable
          label="手机"
        />

        <Button
          @click="submit"
          :disabled="!formReady"
          class="mt-4"
          block
          type="primary"
        >
          提交
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Button, Image, Loading } from 'vant'
import _ from 'lodash'
export default {
  components: {
    Field,
    Button,
    vanImage: Image,
    vanLoading: Loading
  },
  data() {
    return {
      // http://yunbo.vifashion.cn/auth/social-callback?openid=oU_qJv6AaWA1Xryaj79WIlkLeba8&redirect=%2F&avatar=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FSYgcAUGVicbukQ9hsJDpg4qnE9R6YlEugiaeia45PITNqPo492hiaRh4IicA2SExYxLZiaNcbZKPNibcNy8wicrrh2Ih1g%2F132
      openid: this.$route.query.openid,
      avatar: this.$route.query.avatar,
      access_token: this.$route.query.access_token,
      redirect: this.$route.query.redirect ? this.$route.query.redirect : '/',
      name: '',
      phone: '',
      code: '',
      disabled: true,
      codeError: '',
      phoneError: ''
    }
  },

  computed: {
    registered() {
      return !!this.access_token
    },
    formReady() {
      return this.name && this.phone && this.code && !this.hasError
    },
    hasError() {
      return this.phoneError !== '' || this.codeError === '口令错误'
    }
  },

  created() {
    if (this.registered) {
      this.saveAccessToken(this.access_token)
    } else {
      // eslint-disable-next-line
      this.$nextTick(function () {
        this.$refs.code.focus()
      })
    }
  },
  methods: {
    // eslint-disable-next-line
    checkPhone: function () {
      if (this.phone && !/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
        this.phoneError = '请输入11位手机号'
      } else {
        this.phoneError = ''
      }
    },
    submit() {
      const data = {
        openid: this.openid,
        name: this.name,
        phone: this.phone,
        group_code: this.code
      }

      this.$axios.$post('auth/register/user-info', data).then(({ data }) => {
        this.saveAccessToken(data)
      })
    },

    saveAccessToken(token) {
      // console.log('token', token)
      // this.$auth.setToken('local', 'Bearer ' + this.token)
      // this.$auth.setStrategy('local')
      this.$auth
        .setUserToken(token)
        .then(() => {
          return this.$router.push(this.redirect)
          // console.log(,this.redirect)
          // window.location.href = this.redirect
        })
        .catch((e) => {
          // this.$auth.logout()
          return this.$router.push('/auth/login?error=1')
          // window.location.href = '/auth/login?error=1'
        })
    },

    // eslint-disable-next-line
    checkCode: _.debounce(function(){
      if (!this.code) {
        return
      }

      this.$axios.get(`/auth/register/group?code=${this.code}`).then((res) => {
        this.codeError = res.data
      })
    }, 2000)
  }
}
</script>

<style>
.van-field__body {
  height: 24px;
}
.codeOk .van-field__error-message {
  color: #48bb78;
}
</style>
