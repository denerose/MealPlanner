<script setup lang="ts">
import type { MealPlan } from '../../data/types';

const props = defineProps<{
    plan: MealPlan
}>();

const shortDay = props.plan.day.substring(0, 3)

</script>

<template>
    <div class="card">
        <div class="card-header">
            <h6 class="d-block d-sm-none d-lg-block">{{ plan.day }}</h6>
            <h6 class="d-none d-sm-block d-lg-none">{{ shortDay }}</h6>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div class="card-title">
                <span>Dinner: </span>
                <span>{{ props.plan.dinner?.mealName }}</span>
            </div>
            <div class="card-text">
                <span> </span>
                <span v-if="props.plan.lunch">Lunch: {{ props.plan.lunch.mealName }}</span>
                <!-- <span v-else>No lunch</span> -->
            </div>
        </div>
    </div>
</template>