<script setup lang="ts">
import { ref } from 'vue';
import { Ingredient, ValidMeal } from '../data/types';
import { useDataStore } from '../data/store';
import TagInput from "@mayank1513/vue-tag-input";

const props = defineProps<ValidMeal>();
const store = useDataStore()

const mealData = ref<ValidMeal>({
    id: props.id,
    mealName: props.mealName,
    description: props.description,
    ingredients: props.ingredients as Ingredient[],
    qualities: props.qualities
});

const submitForm = async () => {
    addTags()
    console.log('Updated meal:', mealData.value.mealName);
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
            <div>
                <label>Ingredients:</label>
                <div class="tag-input">
                    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
                        validation-message="must be a word" :customDelimiter="customDelimiter" tagBgColor="#4f396c" />
                </div>
            </div>
            <div>
                <label>Qualities:</label>
                <div class="quals-box">
                    <div>
                        <label>
                            <input type="checkbox" id="isHighCarb" v-model="mealData.qualities.isHighCarb" />
                            High Carb
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="isHighVeg" v-model="mealData.qualities.isHighVeg" />
                            High Veg
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="makesLunch" v-model="mealData.qualities.makesLunch" />
                            Makes Lunch
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="isCreamy" v-model="mealData.qualities.isCreamy" />
                            Creamy
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="isAcidic" v-model="mealData.qualities.isAcidic" />
                            Acidic
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="outdoorCooking" v-model="mealData.qualities.outdoorCooking" />
                            Outdoor Cooking
                        </label>
                    </div>
                </div>
            </div>

            <button type="submit">Update Meal</button>
        </form>
    </div>
</template>


<style scoped>
.tag-input {
    margin: 2px;
    padding: 3px;
}
</style>
