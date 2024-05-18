<script setup lang="ts">
import IngredientList from '../components/meals/IngredientList.vue';
import MealForm from '../components/meals/MealForm.vue';
import MealList from '../components/meals/MealList.vue';
</script>

<template>
    <div class="page-frame bg-white mx-auto my-2 p-2 p-sm-3 p-md-5" style="--bs-bg-opacity: .9;">
        <h2>Meals and Recipes</h2>
        <div class="py-2">
            <router-link class="" :to="{ name: 'bulk' }"><button class="btn btn-success">Bulk
                    Edit Meals</button></router-link>
        </div>
        <div class="card">
            <details class="card-body">
                <summary>
                    <h4>Add new meal</h4>
                </summary>
                <MealForm />
            </details>
        </div>
        <hr />
        <div class="card">
            <details class="card-body">
                <summary>
                    <h4>Manage meals</h4>
                </summary>
                <MealList />
            </details>
        </div>
        <hr />
        <div class="card">
            <details class="card-body">
                <summary>
                    <h4>Manage ingredients</h4>
                </summary>
                <IngredientList />
            </details>
        </div>
    </div>
</template>

<style scoped></style>