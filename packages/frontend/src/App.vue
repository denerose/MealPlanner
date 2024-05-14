<script setup lang="ts">
import DataFrame from './views/DataFrame.vue'
import LoadingWheel from './components/LoadingWheel.vue';

</script>

<template>
  <Suspense>
    <DataFrame />
    <template #fallback>
      <LoadingWheel />
    </template>
  </Suspense>

</template>
