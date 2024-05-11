<script setup lang="ts">
import type { MealPlan } from '../../data/types';

const props = defineProps<{
    plan: MealPlan
}>();
</script>

<template>
    <div class="card">
        <div class="card-header bg-success" style="--bs-bg-opacity: .3;">
            <h5>Today</h5>
        </div>
        <div class="card-body d-flex">
            <div class="flex-fill">
                <h6 class="card-title">
                    <span>Dinner: </span>
                    <span>{{ props.plan.dinner?.mealName }}</span>

                </h6>
                <div class="card-text">
                    <span>Lunch: </span>
                    <span v-if="props.plan.lunch">{{ props.plan.lunch.mealName }}</span>
                    <span v-else>No lunch</span>
                </div>
            </div>
            <div class="vr"></div>
            <div class="card-text px-2 flex-fill">
                <h6>Description & Recipe</h6>
                <p>{{ props.plan.dinner?.description }}</p>
            </div>
        </div>
    </div>
</template>