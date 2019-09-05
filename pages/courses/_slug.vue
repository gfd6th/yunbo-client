<template>
  <div>
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      class="player"
      style="width:100%; height:32vh"
    />
    <div>
      <div style="height:60vh" class="flex flex-column">
        <div style="margin:1rem">
          <h1 class="m-0">
            {{ title }}
          </h1>
          <div class="pt-2">
            <intro
              :intro="intro"
              :lessons="lessons"
              :lesson="lesson"
              :free="free"
              :progress="progress"
              :level="level"
            />
          </div>
        </div>
        <div
          class="p-3 bg-white border radius box-shadow mx-3 flex-1"
          style="max-height: 80%; overflow:scroll"
        >
          <skeleton :row="10" :loading="loading">
            <Lessons
              :lessons="lessons"
              v-on:toLesson="toLesson"
              :lesson="lesson"
              :lessonQuery="lessonQuery"
            />
          </skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { Skeleton } from 'vant'
import Lessons from '@/components/courses/Lessons'
import Intro from '@/components/courses/Intro'
import wxjssdk from '@/components/mixins/wxjssdk'

export default {
  components: {
    videoPlayer,
    Intro,
    Lessons,
    Skeleton
    // Info,
  },
  mixins: [wxjssdk],
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      course: {},
      desc: '云泊硬笔',
      loading: true,
      lessons: [],
      lesson: {},
      lessonQuery: this.$route.query.lesson ? this.$route.query.lesson : 1,
      playerOptions: {
        autoplay: false,
        playbackRates: [0.8, 1.0, 1.2, 1.5, 2.0],

        fill: true,
        preload: 'auto',
        // src: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ]
      }
    }
  },
  computed: {
    progress() {
      return `${this.lessonQuery}/${this.lessons.length}`
    },
    src() {
      return this.lesson.video
    },
    title() {
      return this.$route.query.lesson ? this.lesson.title : this.course.title
    },
    cover() {
      return this.course.img
    },
    free() {
      return this.course.free
    },
    level() {
      return this.course.level
    },
    intro() {
      return this.$route.query.lesson ? this.lesson.intro : this.course.intro
    }
  },

  async created() {
    const res = await this.$axios.get(`courses/${this.$route.params.slug}`)
    const data = res.data.data
    this.course = data

    this.lessons = this.course.lessons
    this.loading = false
    this.findLesson()
    this.playerOptions.sources[0].src = this.src

    if (!this.src) {
      this.playerOptions.poster = this.course.img
      this.show = true
    }
  },

  methods: {
    findLesson() {
      this.lesson = this.lessons.find((item, i) => {
        // eslint-disable-next-line
            return i + 1 == this.lessonQuery
      })
    },
    toLesson({ item: lesson, index }) {
      // eslint-disable-next-line
      if (index == this.lessonQuery) return
      if (!lesson.video) {
        this.$store.commit('showLoginModal')
        return
      }
      this.$router.push({
        query: {
          lesson: index
        }
      })
      this.lessonQuery = index
      this.findLesson()
      this.playerOptions.sources[0].src = this.src
      // this.playerOptions.autoplay = true

      this.getWxjssdk(index)
    }
  }
}
</script>

<style lang="scss">
.player .video-js .vjs-big-play-button {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 3.5rem;
  line-height: 3.5rem;
}
.vjs-error-display .vjs-modal-dialog-content {
  display: none;
}
</style>
