<script setup lang="ts">
import { MealPlan } from '../../data/types';
import SummaryCard from './SummaryCard.vue';


const props = defineProps<{
    plans: MealPlan[]
}>();

</script>

<template>
    <div class="card-group">
        <SummaryCard v-for="plan in props.plans" :plan="plan" :id="plan.date"></SummaryCard>
    </div>
</template>