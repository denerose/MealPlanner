<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDataStore } from '../data/store';
import type { MealPlan } from '../data/types';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import EditPlanForm from '../components/editplans/EditPlanForm.vue';
// import MealPlanForm from '../components/MealPlanForm.vue';

const route = useRoute();
const store = useDataStore();

// if (store.nextMealPlans.length < 7) {
//     await store.fetchMealList()
//     await store.fetchMealPlans()
//     await store.createNewWeek()
// }

const props = defineProps<{
    id: string
}>()

const { mealPlans, nextMealPlans } = storeToRefs(store)

const currentPlan = ref<MealPlan>(getActiveMealPlan(Number(props.id)))

function getActiveMealPlan(idToFind: number): MealPlan {
    const allMealPlans: MealPlan[] = mealPlans.value.concat(nextMealPlans.value)
    const result = allMealPlans.find((plan) => plan.id === idToFind)
    if (result) return result
    else return {
        id: 0,
        date: '2024-01-01',
        day: 'Monday'
    }
}
</script>

<template>
    <div class="card">
        <div v-if="currentPlan.id === 0" class="card-body">
            <div class="bg-danger">No such plan exists!</div>
        </div>
        <div v-else class="card-body" :key="`edit-plan-${route.params.id}`">
            <Suspense>
                <EditPlanForm v-bind="currentPlan"></EditPlanForm>
            </Suspense>
        </div>
    </div>
</template>