<script setup lang="ts">
import { ref } from 'vue';
import { Ingredient, ValidMeal } from '../data/types';
import { useDataStore } from '../data/store';
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const props = defineProps(['isEditMode', 'initialMeal']);
const store = useDataStore()

const isEditMode: boolean = props.isEditMode

const mealData = ref<ValidMeal>({
    mealName: '',
    description: '',
    ingredients: [] as Ingredient[],
    id: undefined,
    qualities: {
        isHighCarb: false,
        isHighVeg: false,
        makesLunch: false,
        isCreamy: false,
        isAcidic: false,
        outdoorCooking: false,
    }
});

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
if (store.allIngredients.length < 1) {
    store.fetchIngredients()
}
const ingredientNamesArray = store.allIngredients.map(ing => ing.ingredientName)
const autocompleteItems = ingredientNamesArray
const tags = ref<string[]>([])
const customDelimiter = [",", " "]
function addTags() {
    const newArray = tags.value.map((tag) => store.findIngIdByName(tag))
    mealData.value.ingredients = newArray
}
</script>

<template>
    <div class="">
        <h2>{{ isEditMode ? 'Edit Meal' : 'Create Meal' }}</h2>
        <form @submit.prevent="submitForm" class="form">
            <div class="mb-3">
                <label for="mealName" class="form-label">Meal Name:</label>
                <input v-model="mealData.mealName" class="form-control" type="text" id="mealName" required />
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea v-model="mealData.description" class="form-control" id="description"></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Ingredients:</label>
                <div class="tag-input form-control">
                    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
                        validation-message="must be a word" :customDelimiter="customDelimiter" tagBgColor="#028218" />
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Qualities:</label><br />
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="makesLunch"
                        v-model="mealData.qualities.makesLunch">
                    <label class="form-check-label" for="makesLunch">🥡 Makes Lunch</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="highCarb"
                        v-model="mealData.qualities.isHighCarb">
                    <label class="form-check-label" for="highCarb">🥐 High Carb</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="highVeg" v-model="mealData.qualities.isHighVeg">
                    <label class="form-check-label" for="highVeg">🥦 Lots of Veg</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="isCreamy" v-model="mealData.qualities.isCreamy">
                    <label class="form-check-label" for="isCreamy">🫕 Creamy</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="isAcid" v-model="mealData.qualities.isAcidic">
                    <label class="form-check-label" for="isAcid">🍋 Acidic</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="outsideCooking"
                        v-model="mealData.qualities.outdoorCooking">
                    <label class="form-check-label" for="outsideCooking">🔥 Outdoor Cooking</label>
                </div>
            </div>

            <hr />
            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update Meal' : 'Create Meal' }}</button>
        </form>
    </div>
</template>


<style scoped>
/* .tag-input {
    margin: 2px;
    padding: 3px;
} */

/* .quals-box {
    display: flex;
    justify-content: space-between;
} */
</style>
