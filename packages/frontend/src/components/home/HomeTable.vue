<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { cleanISODate } from '../../data/helpers.ts';
import TodayCard from './TodayCard.vue';
import { MealPlan } from '../../data/types';
import CurrentWeekSummary from './CurrentWeekSummary.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useDataStore()

const { mealPlans, nextMealPlans } = storeToRefs(store)

const today: string = cleanISODate(new Date())
const todayPlan = store.mealPlans.find((i) => i.date === today) as MealPlan

onMounted(() => {
    const todayCard = document.getElementById(today)
    todayCard?.classList.add('text-bg-success')
})

</script>

<template>
    <TodayCard :plan="todayPlan" class="d-none d-sm-block"></TodayCard>
    <br />
    <CurrentWeekSummary :plans="mealPlans"></CurrentWeekSummary>
    <br />
    <details>
        <summary>Next Week</summary>
        <div class="py-2">
            <router-link class="nav-link" :to="{ path: `/plan/${store.getNextMonday}` }"><button
                    class="btn btn-success">Edit Next Week</button></router-link>
        </div>
        <CurrentWeekSummary :plans="nextMealPlans"></CurrentWeekSummary>
    </details>
</template>