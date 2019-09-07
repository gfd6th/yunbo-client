<template>
  <div>
    <Info :progress="progress" :total="lessons.length" v-if="!intro" />

    <v-clamp :max-lines="1" autoresize style="line-height: 1.5rem">
      {{ intro }}
      <span
        slot="after"
        v-if="expanded || clamped"
        slot-scope="{ toggle, expanded, clamped }"
        class="ml-4 text-green inline-flex items-center"
      >
        <span class="text-gray pr-2">
          <Info :progress="progress" :total="lessons.length" />
          <span v-if="fromHome">
            <Tag v-if="free" type="danger">
              免费
            </Tag>
            <Tag v-if="level" :color="$level(level)" plain>
              {{ level }}
            </Tag>
          </span>
        </span>
        <span v-if="expanded" @click="toggle">
          收起 <Icon name="arrow-up" />
        </span>

        <span v-else @click="toggle"> 展开 <Icon name="arrow-down" /> </span>
      </span>
    </v-clamp>
  </div>
</template>

<script>
import { Icon, Tag } from 'vant'
import VClamp from 'vue-clamp'
import Info from '@/components/courses/Info'
export default {
  components: { Icon, VClamp, Tag, Info },
  props: ['intro', 'level', 'lessons', 'free', 'progress'],
  computed: {
    fromHome() {
      return !this.$route.query.lesson
    }
  }
}
</script>

<style></style>
