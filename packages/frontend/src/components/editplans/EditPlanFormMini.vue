<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { MealPlan, RawMeal } from '../../data/types';
import { ref } from 'vue';
import { getSuggestion, getSuggestedMeals } from '../../data/helpers';
import SuggestionDisplay from './SuggestionDisplay.vue'

const store = useDataStore()

const props = defineProps<MealPlan>()

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

const displayDate = new Date(props.date).toLocaleDateString(navigator.language, {
    day: 'numeric',
    month: 'short',
})

const submitForm = async () => {
    planData.value.dinner = store.meals.find(meal => meal.mealName === dinnerText.value) as unknown as RawMeal
    planData.value.lunch = store.meals.find(meal => meal.mealName === lunchText.value) as unknown as RawMeal
    await store.pushUpdatedMealPlan(planData.value)
    const editDiv = document.getElementById(`div-${props.id}`)
    if (editDiv) editDiv.toggleAttribute("hidden")
}

const handleSuggest = async () => {
    const suggestion = await getSuggestion(props)
    dinnerText.value = suggestion.mealName
}

const suggestionList = await getSuggestedMeals(props)


const handlePick = (choice: string) => {
    dinnerText.value = choice
}
</script>

<template>
    <div>
        <h5>{{ planData.day }} - {{ displayDate }}</h5>
        <form class="form" @submit.prevent="submitForm">
            <div class="form-floating">
                <select v-model="dinnerText" class="form-select" id="dinnerSelect"
                    aria-label="Floating label select example">
                    <option disabled value="">Please select one</option>
                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{ mealOption.mealName }}
                    </option>
                </select>
                <label for="dinnerSelect">Dinner</label>
            </div>
            <div class="form-floating my-2">
                <select v-model="lunchText" class="form-select" id="lunchSelect"
                    aria-label="Floating label select example">
                    <option disabled value="">Please select one</option>
                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{ mealOption.mealName }}
                    </option>
                </select>
                <label for="lunchSelect">Lunch (optional)</label>
            </div>
            <div class="d-flex">
                <div class="btn-group" role="group">
                    <button class="btn btn-primary" type="submit">Save</button>
                </div>
                <div class="btn-group ms-auto" role="group" aria-label="Suggestion buttons">
                    <button type="button" class="btn btn-outline-primary" @click.prevent="handleSuggest">Pick
                        Dinner</button>

                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="meal in suggestionList">
                                <SuggestionDisplay :key="meal.id" :meal="meal" @click="handlePick(meal.mealName)">
                                </SuggestionDisplay>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>