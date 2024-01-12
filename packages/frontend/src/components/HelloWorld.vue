<script setup lang="ts">
import { ref } from 'vue'
import MealTable from './MealTable.vue';

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  <Suspense>
    <MealTable />
  </Suspense>
</template>

<style scoped></style>
