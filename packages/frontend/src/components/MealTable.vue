<script setup lang="ts">
import { useDataStore } from '../data/store';
import MealTab from './MealTab.vue';
import MealCard from './MealCard.vue'
// import LunchTab from './LunchTab.vue'
// import { PlusCircleIcon } from '@heroicons/vue/24/outline';

const store = useDataStore()

if (store.mealPlans.length == 0) {
    await store.fetchMealList()
    await store.fetchMealPlans()
}

</script>

<template>
    <div class="container mb-2">
        <h3>Current Week</h3>
        <div class="card-group">
            <MealCard v-for="day in store.mealPlans" :plan="day"></MealCard>
        </div>
    </div>
    <div v-if="store.nextMealPlans.length == 0"><button @click="store.createNewWeek">Add Next Week</button></div>
    <div v-else>
        <div class="container">
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
