<script setup lang="ts">
import { useDataStore } from '../data/store';

const store = useDataStore()
store.fetchMealList()

</script>

<template>
    <h3>Meals List for Testing</h3>
    <ul>
        <li v-for="meal in store.meals">{{ meal.mealName }}
            <ul>
                <li v-for="ingredient in meal.ingredients">{{ ingredient.ingredientName }}</li>
            </ul>
        </li>
    </ul>
</template>