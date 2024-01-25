<script setup lang="ts">
import { useDataStore } from '../data/store';
import MealTab from './MealTab.vue';

const store = useDataStore()
await store.fetchMealList()
await store.fetchMealPlans()

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Day:</th>
                <th v-for="meal in store.mealPlan">{{ meal.day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Dinner:</td>
                <td v-for="meal in store.mealPlan">
                    <MealTab :plan="meal"></MealTab>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
tr {
    min-width: 120px;
}
</style>
