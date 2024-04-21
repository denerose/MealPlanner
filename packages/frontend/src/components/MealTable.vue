<script setup lang="ts">
import { useDataStore } from '../data/store';
import MealTab from './MealTab.vue';
import LunchTab from './LunchTab.vue'
// import { PlusCircleIcon } from '@heroicons/vue/24/outline';

const store = useDataStore()

if (store.mealPlans.length == 0) {
    await store.fetchMealList()
    await store.fetchMealPlans()
}

</script>

<template>
    <div>
        <h3>Current Week</h3>
        <table>
            <thead>
                <tr>
                    <th>Day:</th>
                    <th v-for="meal in store.mealPlans">{{ meal.day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Dinner:</b></td>
                    <td v-for="meal in store.mealPlans">
                        <MealTab :plan="meal" :key="meal.id"></MealTab>
                    </td>
                </tr>
                <tr>
                    <td><b>Lunch:</b></td>
                    <td v-for="meal in store.mealPlans">
                        {{ meal.lunch?.mealName }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="store.nextMealPlans.length == 0"><button @click="store.createNewWeek">Add Next Week</button></div>
    <div v-else>
        <h3>Next Week</h3>
        <table>
            <thead>
                <tr>
                    <th>Day:</th>
                    <th v-for="meal in store.nextMealPlans">{{ meal.day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Dinner:</b></td>
                    <td v-for="meal in store.nextMealPlans">
                        <MealTab :plan="meal" :key="meal.id"></MealTab>
                    </td>
                </tr>
                <tr>
                    <td><b>Lunch:</b></td>
                    <td v-for="meal in store.nextMealPlans">
                        {{ meal.lunch?.mealName }}
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
