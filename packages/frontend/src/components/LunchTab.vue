<script setup lang="ts">
// import { getSuggestion } from '../data/helpers';
import { MealPlan } from '../data/types';
import NewMealPlanBtn from './NewMealPlanBtn.vue';
// import { SparklesIcon } from '@heroicons/vue/24/outline';

// import { MealPlan } from '../data/types';

const props = defineProps<{
    plan: MealPlan
}>()

// async function handleSuggest(plan: MealPlan) {
//     const suggestion = await getSuggestion(plan)
//     console.log(suggestion)
// }

</script>

<template>
    <div class="meal-item">
        <div><span v-if="props.plan.lunch">{{ props.plan.lunch.mealName }}</span>
            <span v-else>No Meal</span>
        </div>
        <div class="plan-btns"></div>
        <NewMealPlanBtn :plan="plan"></NewMealPlanBtn>
    </div>
</template>

<style scoped>
.meal-item {
    background-color: rgba(246, 233, 159, 0.443);
    border: 0.5px solid gold;
    display: flex;
    min-width: 130px;
    justify-content: space-between;
    border-radius: 13px;
    padding: 5px;
}

span {
    flex-grow: 3;
    min-width: 80%;
}

.plan-btns {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
</style>