<script setup lang="ts">
import { useDataStore } from '../data/store';
import MealTab from './MealTab.vue';
import { PlusCircleIcon } from '@heroicons/vue/24/outline';

const store = useDataStore()
await store.fetchMealList()
await store.fetchMealPlans()

const handleNewRowClick = () => {

}

</script>

<template>
    <div class="table-overflow">
        <table>
            <thead>
                <tr>
                    <th>Day:</th>
                    <th v-for="meal in store.mealPlan">{{ meal.day }}</th>
                    <th>New+</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Dinner:</b></td>
                    <td v-for="meal in store.mealPlan">
                        <MealTab :plan="meal" :key="meal.id"></MealTab>
                    </td>
                    <td>
                        <PlusCircleIcon class="icon" @click="handleNewRowClick" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-overflow {
    overflow-x: auto;
    width: 80%;
}

tr {
    min-width: 90%;
    border: none;
}

table {
    margin: auto;
    border-collapse: separate;
    width: 100%;
}

td,
th {
    border-radius: 5px;
}

th {
    background-color: rgba(200, 255, 145, 0.2);
}

.icon {
    max-width: 1.5rem;
}
</style>
