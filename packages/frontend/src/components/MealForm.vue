<script setup lang="ts">
import { ref } from 'vue';
import { Ingredient, Meal } from '../data/types';
import { useDataStore } from '../data/store';
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const props = defineProps(['isEditMode', 'initialMeal']);
const store = useDataStore()

const isEditMode: boolean = props.isEditMode

const mealData = ref<Meal>({
    mealName: '',
    description: '',
    ingredients: [] as Ingredient[],
    id: undefined
});

// const addIngredient = () => {
//     mealData.value.ingredients.push({ ingredientName: '' });
// };

// const removeIngredient = (index: number) => {
//     mealData.value.ingredients.splice(index, 1);
// };

const submitForm = async () => {
    addTags()
    if (isEditMode) {
        console.log('Updated meal:', mealData.value);
        await store.pushUpdatedMeal(mealData.value)
    } else {
        console.log('New meal:', mealData.value);
        await store.pushNewMeal(mealData.value)
    }
};

// tag input options
store.fetchIngredients()
const ingredientNamesArray = store.allIngredients.map(ing => ing.ingredientName)
const autocompleteItems = ingredientNamesArray
const tags = ref<string[]>([])
function addTags() {
    const newArray = tags.value.map((tag) => store.findIngIdByName(tag))
    mealData.value.ingredients = newArray
}
</script>

<template>
    <div>
        <h2>{{ isEditMode ? 'Edit Meal' : 'Create Meal' }}</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="mealName">Meal Name:</label>
                <input v-model="mealData.mealName" type="text" id="mealName" required />
            </div>

            <div>
                <label for="description">Description:</label>
                <textarea v-model="mealData.description" id="description"></textarea>
            </div>

            <div>
                <label>Ingredients:</label>
                <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
                    validation-message="must be a word" tagBgColor="#028218" />
                <!-- <IngredientInput v-model="mealData.ingredients"></IngredientInput> -->
                <!-- <div v-for="(ingredient, index) in mealData.ingredients" :key="index">
                    <input v-model="ingredient.ingredientName" type="text" />
                    <button @click="removeIngredient(index)">Remove</button>
                </div>
                <button @click="addIngredient">Add Ingredient</button> -->
            </div>

            <button type="submit">{{ isEditMode ? 'Update Meal' : 'Create Meal' }}</button>
        </form>
    </div>
</template>
  

<style scoped></style>
