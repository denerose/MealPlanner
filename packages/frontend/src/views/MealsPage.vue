<script setup lang="ts">
import IngredientList from '../components/IngredientList.vue';
import MealForm from '../components/MealForm.vue';
import MealList from '../components/MealList.vue';
</script>

<template>
    <div class="card">
        <details open>
            <summary>Manage meals</summary>
            <MealList />
        </details>

        <details>
            <summary>Add new meal</summary>
            <MealForm />
        </details>

        <details>
            <summary>Manage ingredients</summary>
            <IngredientList />
        </details>
    </div>
</template>

<style scoped></style>