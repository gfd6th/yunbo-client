<template>
  <li @click="open = !open">
    <div class="text-green flex items-center">
      <span>
        {{ group.name }}
      </span>
      <span class="text-sm mx-3"> ({{ group.code }}) </span>
      <Icon :name="icon" />
    </div>
    <div v-show="open" class="text-sm">
      <div>
        终/年/免: {{ group.paid_stat['终身用户'] || 0 }}/{{
          group.paid_stat['年费用户'] || 0
        }}/{{ group.paid_stat['普通用户'] }}
      </div>
      <div>收益: {{ group.profit }} 元</div>
      <div>
        <ol>
          <li v-for="member in group.members">
            {{ member.name }}
            <span v-if="member.lifetime">
              <Tag type="success" plain>终</Tag>
            </span>
            <span v-if="yearly(member.expire_at)">
              <Tag type="primary" plain>年</Tag>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </li>
</template>

<script>
import { Icon, Tag } from 'vant'
import moment from 'moment'

export default {
  components: { Icon, Tag },
  props: ['group'],
  data() {
    return {
      open: false
    }
  },
  computed: {
    icon() {
      return this.open ? 'arrow-down' : 'arrow-left'
    }
  },
  methods: {
    yearly(time) {
      return moment(time) > moment()
    }
  }
}
</script>

<style></style>
