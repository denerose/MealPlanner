<script setup lang="ts">
import { ref } from 'vue';
import { MealPlan } from '../data/types';
import { useDataStore } from '../data/store';
import NewMealBtn from './NewMealBtn.vue';
// import { SparklesIcon } from '@heroicons/vue/24/outline';
import { getSuggestion, getSuggestedMeals } from '../data/helpers';


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
    lunch: props.lunch,
})

const dinnerText = ref(
    props.dinner?.mealName
)

const lunchText = ref(
    props.lunch?.mealName
)

const displayDate = new Date(props.date).toLocaleDateString()

const submitForm = async () => {
    planData.value.dinner = store.meals.find(meal => meal.mealName === dinnerText.value)
    planData.value.lunch = store.meals.find(meal => meal.mealName === lunchText.value)
    await store.pushUpdatedMealPlan(planData.value)
}

const handleSuggest = async () => {
    const suggestion = await getSuggestion(props)
    dinnerText.value = suggestion.mealName
    // alert(suggestion.mealName)
}

const suggestionList = await getSuggestedMeals(props)

const handlePick = (choice: string) => {
    dinnerText.value = choice
}

</script>
<template>
    <div>
        <h4>{{ props.day }} - {{ displayDate }}</h4>
    </div>
    <div class="plan-frame">
        <div>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="dinnerSelect">Dinner:</label>
                    <div>
                        <select v-model="dinnerText" id="dinnerSelect" required>
                            <option disabled value="">Please select one</option>
                            <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
            mealOption.mealName }}</option>
                        </select>
                        <button style="margin-left: 1rem;" @click.prevent="handleSuggest">Pick For Me</button>
                    </div>
                    <label>Lunch:</label>
                    <select v-model="lunchText" id="lunchSelect">
                        <option disabled value="">No lunch</option>
                        <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
            mealOption.mealName }}</option>
                    </select>
                    <hr />
                    <div class="buttons">
                        <button type="submit">Update</button>
                    </div>
                </div>
            </form>
            <NewMealBtn></NewMealBtn>
        </div>
        <div>
            <h5>Suggested Options</h5>
            <ul>
                <li v-for="meal in suggestionList" :key="meal.id" @click="handlePick(meal.mealName)">{{ meal.mealName }}
                </li>
            </ul>
            <hr />
        </div>
    </div>
</template>
<style scoped>
.buttons {
    display: flex;
}

.plan-frame {
    display: grid;
    grid-template-columns: auto auto;
}
</style>