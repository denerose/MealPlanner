<script setup lang="ts">
import { MealPlan } from '../data/types';
import NewMealPlanBtn from './NewMealPlanBtn.vue';

// import { MealPlan } from '../data/types';

const props = defineProps<{
    plan: MealPlan
}>()

</script>
<template>
    <div class="meal-item">
        <div><span v-if="props.plan.dinner">{{ props.plan.dinner.mealName }}</span>
            <NewMealPlanBtn v-else :plan="plan"></NewMealPlanBtn>
        </div>
    </div>
</template>
<style scoped>
.meal-item {
    background-color: rgba(246, 233, 159, 0.443);
    border: 0.5px solid gold;
}
</style>