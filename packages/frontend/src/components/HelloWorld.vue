<script setup lang="ts">
import MealTable from './MealTable.vue';
import MealForm from './MealForm.vue'
import MealList from './MealList.vue';
import IngredientList from './IngredientList.vue';
// import TagInputTest from './TagInputTest.vue';

defineProps<{ msg: string }>()

</script>

<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <Suspense>
      <MealTable />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
    <div class="container">
      <MealList></MealList>
      <IngredientList></IngredientList>
    </div>

    <MealForm></MealForm>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
