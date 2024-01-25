<script setup lang="ts">
import { ref } from 'vue';
import { MealPlan } from '../data/types';
import { useDataStore } from '../data/store';


const props = defineProps<MealPlan>()
const store = useDataStore()


const planData = ref<MealPlan>({
    id: props.id,
    date: props.date,
    day: props.day,
    dinner: props.dinner,
})

const submitForm = async () => {
    store.pushUpdatedMealPlan(planData.value)
}

</script>
<template>
    <form @submit.prevent="submitForm">
        <h4>{{ props.day }}</h4>
        <input v-model="planData.date" type="date" required>
        <div>
            <label for="dinnerSelect">Dinner:</label>
            <select v-model="planData.dinner" id="dinnerSelect" required>
                <option disabled value="">Please select one</option>
                <option v-for="mealOption in store.meals" :key="mealOption.mealName">{{ mealOption.mealName }}</option>
            </select>
            <button type="submit">Update</button>
        </div>
    </form>
</template>
<style scoped></style>