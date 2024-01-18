<script setup lang="ts">
import { ref } from 'vue';
import { Ingredient, Meal } from '../data/types';
import { useDataStore } from '../data/store';
import TagInput from "@mayank1513/vue-tag-input";

const props = defineProps<Meal>();
const store = useDataStore()

const mealData = ref<Meal>({
    id: props.id,
    mealName: props.mealName,
    description: props.description,
    ingredients: props.ingredients as Ingredient[],
});

const submitForm = async () => {
    addTags()
    console.log('Updated meal:', mealData.value);
    await store.pushUpdatedMeal(mealData.value)
};

// tag input options
store.fetchIngredients()
const ingredientNamesArray = store.allIngredients.map(ing => ing.ingredientName)
const autocompleteItems = ingredientNamesArray
const tags = ref<string[]>(props.ingredients.map(ing => ing.ingredientName))
const customDelimiter = [",", " "]

function addTags() {
    const newArray = tags.value.map((tag) => store.findIngIdByName(tag))
    mealData.value.ingredients = newArray
}
</script>

<template>
    <div>
        <h2>Edit Meal</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="mealName">Meal Name:</label>
                <input v-model="mealData.mealName" type="text" id="mealName" required />
            </div>

            <div>
                <label for="description">Description:</label>
                <textarea v-model="mealData.description" id="description"></textarea>
            </div>

            <div class="tag-input">
                <label>Ingredients:</label>
                <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
                    validation-message="must be a word" :customDelimiter="customDelimiter" tagBgColor="#4f396c" />
            </div>

            <button type="submit">Update Meal</button>
        </form>
    </div>
</template>
  

<style scoped>
.tag-input {
    margin: 5px;
    padding: 3px;
}
</style>
