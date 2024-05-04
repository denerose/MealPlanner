<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDataStore } from '../../data/store';
import { MealPlan } from '../../data/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useDataStore()
const route = useRoute()

const props = defineProps<{
    id: string
}>()

const { mealPlans, nextMealPlans } = storeToRefs(store)

const activePlan = ref<MealPlan>(getActiveMealPlan(Number(props.id)))

function getActiveMealPlan(idToFind: number): MealPlan {
    const allMealPlans = mealPlans.value.concat(nextMealPlans.value)
    const result = allMealPlans.find((plan) => plan.id === idToFind)
    if (result) return result
    else return {
        id: 0,
        date: '2024-01-01',
        day: 'Monday'
    }
}

const planData = ref<MealPlan>({
    id: activePlan.value.id,
    date: activePlan.value.date,
    day: activePlan.value.day,
    dinner: activePlan.value.dinner,
    lunch: activePlan.value.lunch,
})

</script>

<template>
    <div :id="`edit-plan-${route.params.id}`">
        <p>placeholder {{ props.id }}</p>
        <div v-if="activePlan">
            <h3>{{ planData.day }}</h3>
        </div>
    </div>
</template>