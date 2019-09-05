<template>
  <div class="me">
    <div class="bg">
      <!-- <Icon name="user-circle-o" size="7rem" style="margin-bottom: -3rem" /> -->
      <van-image
        :src="avatar"
        round
        style="margin-bottom: -3rem; border: 5px solid white"
        class="box-shadow"
        width="7rem"
      />
    </div>
    <div class="text-center name">
      {{ name }}
    </div>
    <div class="text-center mt-4">
      <Tag v-if="lifetime" plain type="danger">
        终身会员
      </Tag>
      <Tag v-if="yearly" plain type="success">
        年费会员
      </Tag>
    </div>
    <div style="margin-top: 2rem; font-size:1.2rem">
      <div v-if="group" class="flex py-1">
        <div style="width:40%" class="text-right pr-2">
          群:
        </div>
        <div>{{ group }}</div>
      </div>
      <template v-if="ownGroup">
        <div class="flex py-1">
          <div style="width:40%" class="text-right pr-2">
            拥有的群(口令):
          </div>
          <ol>
            <GroupItem :group="group" v-for="group in ownGroup" class="mb-2" />
          </ol>
        </div>
        <div class="flex py-1">
          <div style="width:40%" class="text-right pr-2">
            待支付:
          </div>
          <div>{{ total(ownGroup) }} 元</div>
        </div>
        <div />
      </template>

      <div class="flex py-1">
        <div style="width:40%" class="text-right pr-2">
          手机:
        </div>
        <div>{{ phone }}</div>
      </div>
      <div v-if="yearly" class="flex py-1">
        <div style="width:40%" class="text-right pr-2">
          {{ expireLabel }}
        </div>
        <div>{{ expireTime }}</div>
      </div>
    </div>
    <div class="text-center" style="margin-top: 2rem">
      <v-button
        v-if="!isPremium"
        @click="$store.commit('showPaidAction')"
        type="primary"
      >
        成为会员
      </v-button>
    </div>
  </div>
</template>

<script>
import { Button, Image, Tag } from 'vant'
import moment from 'moment'
import GroupItem from '@/components/me/GroupItem'
moment.locale('zh-CN')

export default {
  middleware: ['auth'],
  components: { vButton: Button, vanImage: Image, Tag, GroupItem },
  data() {
    return {
      name: this.$auth.user.name,
      group: '',
      phone: '',
      avatar: '',
      expire_at: this.$auth.user.expire_at,
      lifetime: this.$auth.user.lifetime,
      isPremium: this.$auth.user.isPremium,
      ownGroup: null
    }
  },
  computed: {
    yearly() {
      return this.expire_at && moment(this.expire_at) > moment()
    },
    expireLabel() {
      return this.yearly ? '付费至:' : '过期于:'
    },
    expireTime() {
      return this.yearly
        ? moment(this.expire_at).format('L')
        : moment(this.expire_at).fromNow()
    }
  },

  created() {
    this.$axios.$get('more-info').then(({ data }) => {
      console.log(data)
      this.ownGroup = data.ownGroup
      this.group = data.group
      this.phone = data.phone
      this.avatar = data.avatar
    })
  },
  methods: {
    total(groups) {
      // eslint-disable-next-line
      const total = groups.map(group => group.profit)
      return total.reduce((acc, cur) => acc + cur)
    }
  }
}
</script>

<style scoped>
.name {
  font-size: 2.5rem;
  margin-top: 4rem;
}

.bg {
  background-image: url('~assets/img/me.png');
  height: 30vh;
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-repeat: no-repeat;
}
.me {
  /* background-image: url('~assets/img/seigaiha.png'); */
  /* min-height: 100vh; */
  padding-bottom: 5rem;
}
</style>
