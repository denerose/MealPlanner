<script setup lang="ts">
import IngredientList from '../components/IngredientList.vue';
import MealForm from '../components/MealForm.vue';
import MealList from '../components/MealList.vue';
</script>

<template>
    <div class="page-frame bg-white" style="--bs-bg-opacity: .9;">
        <h2>Meals and Recipes</h2>
        <div class="card">
            <details class="card-body" open>
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
                    <h4>Add new meal</h4>
                </summary>
                <MealForm />
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