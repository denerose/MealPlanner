<script setup lang="ts">
import MealTable from './MealTable.vue';
import MealForm from './MealForm.vue'
import MealList from './MealList.vue';
// import TagInputTest from './TagInputTest.vue';

defineProps<{ msg: string }>()

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Suspense>
    </Suspense>
    <MealList></MealList>
    <MealForm></MealForm>
  </div>
  <Suspense>
    <MealTable />
  </Suspense>
</template>

<style scoped></style>
