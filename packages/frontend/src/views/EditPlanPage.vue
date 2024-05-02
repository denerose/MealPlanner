<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDataStore } from '../data/store';
import type { MealPlan } from '../data/types';
import MealPlanForm from '../components/MealPlanForm.vue';

const route = useRoute();
const store = useDataStore();

const planToFind: MealPlan | undefined = store.mealPlans.find(plan => plan.id == Number(route.params.id))
const currentPlan: MealPlan = planToFind ? planToFind : {
    id: 0,
    day: 'Monday',
    date: '2024-01-01'
}


</script>

<template>
    <div v-if="currentPlan == undefined" class="bg-danger text-white">No such plan exists!</div>
    <details v-else open>
        <summary>
            {{ currentPlan.day }}
        </summary>
        <div>
            <MealPlanForm v-bind="currentPlan"></MealPlanForm>
        </div>
    </details>

</template>