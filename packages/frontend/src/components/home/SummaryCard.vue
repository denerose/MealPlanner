<script setup lang="ts">
import type { MealPlan } from '../../data/types';

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
            <div class="card-title">
                <span>Dinner: </span>
                <span>{{ props.plan.dinner?.mealName }}</span>
            </div>
            <div class="card-text">
                <span>Lunch: </span>
                <span v-if="props.plan.lunch">{{ props.plan.lunch.mealName }}</span>
                <span v-else>Edit to add</span>
            </div>
        </div>
    </div>
</template>