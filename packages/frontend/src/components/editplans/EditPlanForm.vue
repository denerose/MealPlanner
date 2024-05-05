<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { MealPlan } from '../../data/types';
import { ref } from 'vue';
import { getSuggestion, getSuggestedMeals } from '../../data/helpers';
import SuggestionDisplay from '../SuggestionDisplay.vue'

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

const displayDate = new Date(props.date).toLocaleDateString()

const submitForm = async () => {
    planData.value.dinner = store.meals.find(meal => meal.mealName === dinnerText.value)
    planData.value.lunch = store.meals.find(meal => meal.mealName === lunchText.value)
    await store.pushUpdatedMealPlan(planData.value)
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
        <div>
            <h3>{{ planData.day }}</h3>
            <p>{{ displayDate }}</p>
            <div>
                <form @submit.prevent="submitForm">
                    <div>
                        <div class=""><label for="dinnerSelect" class="form-label">Dinner:</label>
                            <button class="btn" @click.prevent="handleSuggest">Pick For Me</button>
                        </div>
                        <select v-model="dinnerText" id="dinnerSelect" class="form-select" required>
                            <option disabled value="">Please select one</option>
                            <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
                mealOption.mealName }}</option>
                        </select>
                        <label class="form-label">Lunch:</label>
                        <br />
                        <select v-model="lunchText" id="lunchSelect" class="form-select">
                            <option disabled value="">Please select one</option>
                            <option v-for="mealOption in store.meals" :value="mealOption.mealName">
                                {{ mealOption.mealName }}</option>
                        </select>
                        <hr />
                        <div class="buttons">
                            <button class="btn" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h5>Suggested Options</h5>
                <SuggestionDisplay v-for="meal in suggestionList" :key="meal.id" :meal="meal"
                    @click="handlePick(meal.mealName)">
                </SuggestionDisplay>
                <hr />
            </div>
        </div>
    </div>
</template>