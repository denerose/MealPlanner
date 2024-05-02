<script setup lang="ts">
import type { MealPlan } from '../data/types';
import { useDataStore } from '../data/store';
import { ref } from 'vue';
import { PencilSquareIcon } from '@heroicons/vue/24/outline';


// import NewMealPlanBtn from './NewMealPlanBtn.vue';

const store = useDataStore()

const props = defineProps<{
    plan: MealPlan
}>();

const editMode = ref(false)

const linkID = props.plan.id

const dinnerText = ref(
    props.plan.dinner?.mealName
)

const lunchText = ref(
    props.plan.lunch?.mealName
)

function handleClick() {
    editMode.value = false
    const details = document.getElementById(`details-${linkID}`)
    details?.toggleAttribute('open')
}

async function handleDinnerChange() {
    props.plan.dinner = store.meals.find(meal => meal.mealName === dinnerText.value)
    await store.pushUpdatedMealPlan(props.plan)

}

async function handleLunchChange() {
    props.plan.lunch = store.meals.find(meal => meal.mealName === lunchText.value)
    await store.pushUpdatedMealPlan(props.plan)
}

</script>

<template>
    <div class="card">
        <div class="card-header">
            <h6>{{ plan.day }}</h6>
            <PencilSquareIcon class="editBtn" @click="editMode = !editMode"></PencilSquareIcon>
        </div>
        <div v-if="editMode" class="card-body d-flex flex-column justify-content-between">
            <div class="card-text">
                <label for="dinnerSelect">Dinner:</label>
                <select v-model="dinnerText" id="dinnerSelect" @change="handleDinnerChange">
                    <option disabled value="">No dinner</option>
                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
                mealOption.mealName }}</option>
                </select>
            </div>
            <div class="card-text">
                <label>Lunch:</label>
                <select v-model="lunchText" id="lunchSelect" @change="handleLunchChange">
                    <option disabled value="">No lunch</option>
                    <option v-for="mealOption in store.meals" :value="mealOption.mealName">{{
                mealOption.mealName }}</option>
                </select>
            </div>
        </div>
        <div v-else class="card-body d-flex flex-column justify-content-between">
            <div class="card-text">
                <span>Dinner:</span><br />
                <span>{{ props.plan.dinner?.mealName }}</span>
            </div>
            <div class="card-text">
                <span>Lunch:</span><br />
                <span v-if="props.plan.lunch">{{ props.plan.lunch.mealName }}</span>
                <span v-else>Edit to add</span>
            </div>
        </div>
        <div class="card-footer">
            <router-link :to="'/' + linkID"><button class="btn btn-success" @click="handleClick">
                    edit </button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.editBtn {
    color: rgb(95, 52, 213);
    max-width: 1.5rem;
}
</style>