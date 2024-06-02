<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { MealPlan, RawMeal } from '../../data/types';
import { onMounted, ref } from 'vue';
import { getSuggestion, getSuggestedMeals } from '../../data/helpers';
import SuggestionDisplay from './SuggestionDisplay.vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';


const store = useDataStore()
const router = useRouter()


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
    year: 'numeric',
})

const submitForm = async () => {
    planData.value.dinner = store.meals.find(meal => meal.mealName === dinnerText.value) as unknown as RawMeal
    planData.value.lunch = store.meals.find(meal => meal.mealName === lunchText.value) as unknown as RawMeal
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

const handleNext = async () => {
    if (props.id) {
        await submitForm()
        router.push({ path: `/plan/${props.id + 1}` })}
}

const handlePrev = async () => {
    if (props.id) {
        await submitForm()
        router.push({ path: `/plan/${props.id - 1}` })}
}

onMounted(() => {
    if (document.getElementById('prev')) {
        if (props.day != 'Monday') {
        const prevBtn = document.getElementById('prev') as HTMLButtonElement
        prevBtn.disabled = false
        }
    }
    if (document.getElementById('next')) {
        if (props.day != 'Sunday') {
        const prevBtn = document.getElementById('next') as HTMLButtonElement
        prevBtn.disabled = false
        }
    }
})

</script>

<template>
    <div>
        <div>
            <div>
                <h3>{{ planData.day }} ({{ displayDate }})</h3>
            </div>
            <hr />
            <div>
                <form class="form" @submit.prevent="submitForm">
                    <div class="row">
                        <div class="col-sm">
                            <h5>Meal Selection</h5>
                            <div class="input-group my-2">
                                <label for="dinnerSelect" class="input-group-text col-12 col-sm-2">
                                    <span class="text-center">Dinner</span>
                                </label>
                                <select v-model="dinnerText" id="dinnerSelect" class="form-select col" required>
                                    <option disabled value="">Please select one</option>
                                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
                                        mealOption.mealName }}</option>
                                </select>
                                <button class="btn btn-outline-secondary col-12 col-sm-3"
                                    @click.prevent="handleSuggest">
                                    Pick For Me</button>
                            </div>
                            <div class="input-group my-2">
                                <label class="input-group-text col-12 col-sm-2">
                                    <span class="align-baseline">Lunch</span>
                                </label>
                                <select v-model="lunchText" id="lunchSelect" class="form-select">
                                    <option disabled value="">Please select one</option>
                                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">
                                        {{ mealOption.mealName }}</option>
                                </select>
                                <button class="btn btn-outline-secondary col-3" disabled>
                                    Leftovers</button>
                            </div>
                        </div>
                        <div class="col-sm">
                            <hr class="d-sm-none" />
                            <h5>Suggested Options</h5>
                            <SuggestionDisplay v-for="meal in suggestionList" :key="meal.id" :meal="meal"
                                @click="handlePick(meal.mealName)">
                            </SuggestionDisplay>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <div class="btn-toolbar" role="toolbar">
                            <div class="btn-group me-2 col-1">
                                <button class="btn btn-outline-primary" type="submit">Save</button>
                            </div>
                            <div class="btn-group col-2 ms-auto">
                                <button class="btn btn-outline-primary" type="submit" id="prev" @click="handlePrev" disabled><ChevronLeftIcon style="height: 1.4rem;"/><span> Prev</span></button>
                                <button class="btn btn-outline-primary" type="submit" id="next" @click="handleNext" disabled><span class="">Next </span><ChevronRightIcon style="height: 1.3rem;" /></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>