<script setup lang="ts">
import { useDataStore } from '../data/store';
import MealTab from './MealTab.vue';
// import LunchTab from './LunchTab.vue'
// import { PlusCircleIcon } from '@heroicons/vue/24/outline';

const store = useDataStore()

if (store.mealPlans.length == 0) {
    await store.fetchMealList()
    await store.fetchMealPlans()
}

</script>

<template>
    <div class="container">
        <h3>Current Week</h3>
        <div class="card-group">
            <div v-for="day in store.mealPlans" class="card">
                <h5 class="card-header">{{ day.day }}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item p-0">
                        <MealTab :plan="day" :key="day.id"></MealTab>
                    </li>
                    <li class="list-group-item">{{ day.lunch?.mealName }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div v-if="store.nextMealPlans.length == 0"><button @click="store.createNewWeek">Add Next Week</button></div>
    <div v-else>
        <h3>Next Week</h3>
        <div class="table-overflow">
            <table class="table">
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
    </div>
</template>

<style scoped>
.table-overflow {
    overflow-x: auto;
    width: 100%;
}

table {
    /* margin: auto;
    border-collapse: separate; */
    width: 100%;
}

.icon {
    max-width: 1.5rem;
}
</style>
