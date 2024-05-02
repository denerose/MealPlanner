<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { cleanISODate } from '../../data/helpers.ts';
import TodayCard from './TodayCard.vue';
import { MealPlan } from '../../data/types';
import CurrentWeekSummary from './CurrentWeekSummary.vue';
import { onMounted } from 'vue';

const store = useDataStore()

if (store.mealPlans.length == 0) {
    await store.fetchMealList()
    await store.fetchMealPlans()
}

const thisWeek = store.mealPlans
const nextWeek = store.nextMealPlans

const today: string = cleanISODate(new Date())
const todayPlan = thisWeek.find((i) => i.date === today) as MealPlan

onMounted(() => {
    const todayCard = document.getElementById(today)
    todayCard?.classList.add('text-bg-success')
})

</script>

<template>
    <TodayCard :plan="todayPlan"></TodayCard>
    <br />
    <CurrentWeekSummary :plans="thisWeek"></CurrentWeekSummary>
    <br />
    <details>
        <summary>Next Week</summary>
        <CurrentWeekSummary :plans="nextWeek"></CurrentWeekSummary>
    </details>
</template>