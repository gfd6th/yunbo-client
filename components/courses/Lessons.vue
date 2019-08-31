<template>
  <ol>
    <li
      v-for="(item, index) in lessons"
      :key="index"
      @click="$emit('toLesson', { item, index: index + 1 })"
      :class="[{ current: index + 1 == lessonQuery }]"
      class="py-2"
    >
      <Row :class="[{ disabled: !item.video }]">
        <van-Col span="1">
          <Icon v-if="!item.video" :name="lock" size="0.8rem" />
        </van-Col>

        <van-Col span="23">
          <h3 class="text-gray m-0" style="font-size: 0.85rem">
            {{ index + 1 }} {{ item.title }}
          </h3>
        </van-Col>
      </Row>
    </li>
    <li class="text-center text-gray text-sm py-4">
      到底部了
    </li>
  </ol>
</template>

<script>
import { Row, Col, Icon } from 'vant'
import lock from '~/assets/img/lock.svg'

export default {
  components: {
    Row,
    vanCol: Col,
    Icon
  },
  props: ['lessons', 'lesson', 'lessonQuery'],
  data() {
    return {
      lock
    }
  }
}
</script>

<style lang="scss">
.current {
  background: #48bb78;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  h3 {
    color: white;
  }
}
.disabled h3 {
  color: #a0aec0;
}
</style>
