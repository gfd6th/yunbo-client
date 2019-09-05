<template>
  <div>
    <nuxt />
    <Navbar />
    <Popup />
    <action-sheet />
    <SubscribeModal />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Popup from '@/components/courses/Popup'
import actionSheet from '@/components/actionSheet'
import SubscribeModal from '@/components/SubscribeModal'
export default {
  components: { SubscribeModal, Navbar, Popup, actionSheet }
}
</script>

<style>
html {
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei',
    Tohoma, Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #4a5568;
  background: #f7fafc;
  padding-bottom: 50px;
  background-image: url('~assets/img/seigaiha.png');
}
.text-green {
  color: #48bb78;
}
.van-tag--plain {
  background: transparent;
}
.bg-white {
  background: #fff;
}
.border {
  border: 1px solid #edf2f7;
}
input {
  font-size: 1rem;
}

.container {
  padding-top: 2rem;
}
.w-1\/3 {
  width: 33%;
}
.w-1\/2 {
  width: 50%;
}
.w-full {
  width: 100px;
}

.card {
  border: 1px solid #eeeeee;
  border-radius: 5px;
}

.radius,
.radius img {
  border-radius: 5px;
}

.box-shadow {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.m-2 {
  margin: 0.5rem;
}
.mx-auto {
  margin: 0 auto;
}
.m-3 {
  margin: 0.75rem;
}
.m-0 {
  margin: 0;
}
.mb-0 {
  margin-bottom: 0;
}
.ml-4 {
  margin-left: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mx-3 {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}
.p-1 {
  padding: 1rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pt-2 {
  padding-top: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-2 {
  padding-right: 0.5rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.font-lg {
  font-size: 1.125rem;
}
.text-black {
  color: black;
}
.text-gray {
  color: #4a5568;
}
.text-gray-900 {
  color: #1a202c;
}
.text-secondary {
  color: #a0aec0;
}

.text-sm {
  font-size: 0.75rem;
}
h3 {
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
}

.font-normal {
  font-weight: normal;
  font-size: 1rem;
}

.flex-column {
  flex-direction: column;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.items-center {
  align-items: center;
}
.flex-1 {
  flex: 1;
}
h1 {
  font-size: 1.2rem;
  line-height: 1.7rem;
}
.inline {
  display: inline;
}
.van-skeleton__row,
.van-skeleton__title,
.van-skeleton__avatar {
  background-color: #cbd5e0 !important;
}
</style>
