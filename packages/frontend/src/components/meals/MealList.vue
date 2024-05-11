<script setup lang="ts">
import { useDataStore } from '../../data/store';
import MealDetailsCard from './MealDetailsCard.vue';

const store = useDataStore()
if (store.meals.length == 0) { store.fetchMealList() }

</script>

<template>
    <div class="container">
        <div class="card-body">
            <ul class="d-flex">
                <MealDetailsCard v-for="meal in store.meals" :meal="meal" />
            </ul>
        </div>
    </div>
</template>

<style scoped></style>