<template>
  <span>
    <span v-if="$route.query.lesson" class="text-sm">
      进度: {{ progress }}
    </span>
    <span v-else class="text-sm">共{{ total }}课时</span>
  </span>
</template>

<script>
export default {
  props: ['progress', 'total']
}
</script>

<style></style>
