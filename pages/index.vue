<template>
  <div class="container">
    <div class="px-4">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
      >
        <div v-for="(course, id) in courses" :key="id" class="mb-4">
          <skeleton
            :row="3"
            :loading="loading"
            title
            avatar
            avatar-size="100px"
            avatar-shape="square"
          >
            <nuxt-link :to="`courses/${course.id}`">
              <row gutter="20">
                <!-- eslint-disable-next-line -->
              <v-col span="8" class="relative text-right">
                  <van-image
                    :src="course.img"
                    fit="cover"
                    lazy-load="true"
                    class="radius box-shadow"
                  />
                  <tag
                    v-if="course.free"
                    class="absolute"
                    type="danger"
                    mark
                    style="top:7px;right:0"
                  >
                    免费
                  </tag>
                </v-col>
                <v-col span="16">
                  <h3 class="font-lg text-gray">
                    {{ course.title }}
                  </h3>
                  <div class="py-2">
                    <tag
                      v-if="course.level"
                      :color="$level(course.level)"
                      plain
                    >
                      {{ course.level }}
                    </tag>
                  </div>
                  <!-- eslint-disable-next-line -->
                <div class="text-secondary">{{ course.lessonCount }}课时</div>
                </v-col>
              </row>
            </nuxt-link>
          </skeleton>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { Skeleton, Row, Col, Image, Tag, List } from 'vant'
import wxjssdk from '@/components/mixins/wxjssdk'
export default {
  components: {
    Skeleton,
    Row,
    vCol: Col,
    'van-image': Image,
    Tag,
    'van-list': List
  },
  mixins: [wxjssdk],
  data() {
    return {
      title: '云泊硬笔',
      desc: '如何写得一手好字',
      loading: true,
      finished: false,
      next: '',
      courses: [{}, {}, {}, {}, {}]
    }
  },
  async created() {
    const res = await this.$axios.$get('/courses')
    this.next = res.links.next
    this.courses = res.data
    this.loading = false
  },

  methods: {
    async onLoad() {
      if (this.next) {
        const res = await this.$axios.$get(this.next)
        this.next = res.links.next
        this.courses = this.courses.concat(res.data)
      } else {
        this.finished = true
      }
      this.loading = false
    },
    async getData() {
      const res = await this.$axios.$get('/courses')
      this.next = res.links.next
      this.courses = res.data
      this.loading = false
    }
  }
}
</script>
