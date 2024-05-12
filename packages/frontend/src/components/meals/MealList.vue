<script setup lang="ts">
import { useDataStore } from '../../data/store';
import MealDetailsCard from './MealDetailsCard.vue';

const store = useDataStore()
if (store.meals.length == 0) { store.fetchMealList() }

</script>

<template>
    <div class="container mx-auto">
        <div class="card-body d-flex flex-wrap mx-auto">
            <div v-for="meal in store.meals" class="col-12 col-sm-2 p-1">
                <MealDetailsCard :meal="meal" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>