<script setup lang="ts">
import { useDataStore } from '../../data/store';
import EditPlanCard from './EditPlanCard.vue'

const store = useDataStore();
const plans = await store.nextMealPlans

if (plans.length == 0) {
    await store.fetchMealList()
    await store.fetchMealPlans()
    if (plans.length == 0) { store.createNewWeek() }
}
</script>

<template>
    <div class="card-group">
        <EditPlanCard v-for="plan in plans" :plan="plan"></EditPlanCard>
    </div>
</template>