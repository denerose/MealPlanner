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
store.fetchIngredients()
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
                <div class="tag-input">
                    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
                        validation-message="must be a word" :customDelimiter="customDelimiter" tagBgColor="#028218" />
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
            <button type="submit">{{ isEditMode ? 'Update Meal' : 'Create Meal' }}</button>
        </form>
    </div>
</template>
  

<style scoped>
.tag-input {
    margin: 2px;
    padding: 3px;
}

.quals-box {
    display: flex;
    justify-content: space-between;
}
</style>
