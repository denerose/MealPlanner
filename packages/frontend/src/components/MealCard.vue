<script setup lang="ts">
import type { MealPlan } from '../data/types';
import NewMealPlanBtn from './NewMealPlanBtn.vue';


const props = defineProps<{
    plan: MealPlan
}>();

</script>

<template>
    <div class="card">
        <div class="card-header">
            <h6>{{ plan.day }}</h6>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title fs-6 md:fs-4 lg:fs-3">{{ plan.dinner?.mealName }}
            </h5>
            <div class="car-text">
                <p v-if="props.plan.lunch">Lunch: {{ plan.lunch?.mealName }}</p>
            </div>
        </div>
        <div class="card-footer">
            <NewMealPlanBtn :plan="plan" />
        </div>
    </div>
</template>