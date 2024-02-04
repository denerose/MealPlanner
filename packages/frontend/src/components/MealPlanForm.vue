<script setup lang="ts">
import { ref } from 'vue';
import { MealPlan } from '../data/types';
import { useDataStore } from '../data/store';
import NewMealBtn from './NewMealBtn.vue';
// import { SparklesIcon } from '@heroicons/vue/24/outline';
import { getSuggestion } from '../data/helpers';


const props = defineProps<MealPlan>()
const store = useDataStore()

// defineOptions({
//     inheritAttrs: false
// })

const planData = ref<MealPlan>({
    id: props.id,
    date: props.date,
    day: props.day,
    dinner: props.dinner,
})

const dinnerText = ref(
    props.dinner?.mealName
)

const submitForm = async () => {
    planData.value.dinner = store.meals.find(meal => meal.mealName === dinnerText.value)
    await store.pushUpdatedMealPlan(planData.value)
}

const handleSuggest = async () => {
    const suggestion = await getSuggestion(props)
    dinnerText.value = suggestion.mealName
    alert(suggestion.mealName)
}

</script>
<template>
    <div>
        <h4>{{ props.day }}</h4>
        <button @click="handleSuggest">Suggestion</button>
        <form @submit.prevent="submitForm">
            <input v-model="planData.date" type="date" required>
            <div>
                <label for="dinnerSelect">Dinner:</label>
                <select v-model="dinnerText" id="dinnerSelect" required>
                    <option disabled value="">Please select one</option>
                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
                        mealOption.mealName }}</option>
                </select>
                <div class="buttons">
                    <button type="submit">Update</button>
                </div>
            </div>
        </form>
        <NewMealBtn></NewMealBtn>
    </div>
</template>
<style scoped>
.buttons {
    display: flex;
}
</style>