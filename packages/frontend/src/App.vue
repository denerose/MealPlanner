<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <Suspense>
    <HelloWorld msg="Hello, World!" />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style scoped></style>
