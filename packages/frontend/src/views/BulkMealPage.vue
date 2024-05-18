<script setup lang="ts">
// import { storeToRefs } from 'pinia';
import { useDataStore } from '../data/store';
import { ref } from 'vue';
import { sortedMeals } from '../data/helpers';
import { ValidMeal } from '../data/types';

const store = useDataStore()
// const { meals } = storeToRefs(store)

const mealData = ref(store.getMeals.toSorted(sortedMeals))

const tableHeadings: string[] = [
    'makesLunch',
    'isHighCarb',
    'isHighVeg',
    'isCreamy',
    'isAcidic',
    'outdoorCooking',
]

function handleChange(changedMeal: ValidMeal) {
    store.pushUpdatedMeal(changedMeal)
}

</script>

<template>
    <div class="container page-frame bg-white mx-auto my-2 p-2 p-sm-3 p-md-5" style="--bs-bg-opacity: .9;">
        <h2>Bulk Edit Page</h2>
        <div class="py-2 d-flex">
            <router-link class="" :to="{ name: 'meals' }"><button class="btn btn-success">Regular Meal
                    Manager</button></router-link>
        </div>
        <p class="fw-lighter">Note: bulk edit is best viewed on a medium or larger screen and is not mobile optimised
        </p>
        <div class="">
            <div class="table-overflow">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Meal Name</th>
                            <th v-for="heading in tableHeadings" scope="col" class="text-center">{{ heading }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="meal in mealData">
                            <td>{{ meal.mealName }}</td>
                            <td class="text-center"><input v-model="meal.qualities.makesLunch"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxMakesLunch" aria-label="Makes Lunch"></td>
                            <td class="text-center"><input v-model="meal.qualities.isHighCarb"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxHighCarb" aria-label="High Carb"></td>
                            <td class="text-center"><input v-model="meal.qualities.isHighVeg"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxHighVeg" aria-label="High Veg"></td>
                            <td class="text-center"><input v-model="meal.qualities.isCreamy"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxCreamy" aria-label="Creamy"></td>
                            <td class="text-center"><input v-model="meal.qualities.isAcidic"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxAcidic" aria-label="Acidic"></td>
                            <td class="text-center"><input v-model="meal.qualities.outdoorCooking"
                                    @change="handleChange(meal)" class="form-check-input" type="checkbox"
                                    id="checkboxOutside" aria-label="Outdoor Cooking"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table-overflow {
    overflow-x: auto;
    max-width: 100%;
}
</style>