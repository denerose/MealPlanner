<script setup lang="ts">
import { useDataStore } from '../../data/store';
import EditPlanCard from './EditPlanCard.vue'

const store = useDataStore();
// const plans = store.nextMealPlans

</script>

<template>
    <h2>Edit Next Week</h2>
    <div class="card-group">
        <EditPlanCard v-for="plan in store.nextMealPlans" :plan="plan"></EditPlanCard>
    </div>
</template>