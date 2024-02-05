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
                <td><b>Dinner:</b></td>
                <td v-for="meal in store.mealPlan">
                    <MealTab :plan="meal" :key="meal.id"></MealTab>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
tr {
    min-width: 90%;
    border: none;
}

table {
    margin: auto;
    border-collapse: separate;
}

td,
th {
    border-radius: 5px;
}

th {
    background-color: rgba(200, 255, 145, 0.2);
}
</style>
