<script setup lang="ts">
import { ref } from "vue";
import { useDataStore } from '../data/store';
import { XMarkIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import ModalComp from "./ModalComp.vue"
import MealFormEdit from "./MealFormEdit.vue";
import { Ingredient, Meal } from "../data/types";

const store = useDataStore()
store.fetchMealList()

// modal controls
const isModalOpened = ref(false);
const modalProps = ref<Meal>({
    id: undefined,
    mealName: 'default',
    description: '',
    ingredients: [] as Ingredient[],
})

const openModal = (passedProps: Meal) => {
    modalProps.value = passedProps
    isModalOpened.value = true;
};
const closeModal = () => {
    isModalOpened.value = false;
};

const submitHandler = () => {
    closeModal()
}
</script>

<template>
    <h3>Meals List for Testing</h3>
    <ul>
        <li v-for="meal in store.meals">
            <div class="item-div">
                <span class="item">{{ meal.mealName }}</span>
                <PencilSquareIcon @click="openModal(meal)" class="edit"></PencilSquareIcon>
                <XMarkIcon @click="store.pushDeleteMeal(Number(meal.id))" class="del">
                </XMarkIcon>
            </div>
            <ul>
                <li v-for="ingredient in meal.ingredients">{{ ingredient.ingredientName }}</li>
            </ul>
        </li>
    </ul>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header>Custom header</template>
        <template #content>
            <MealFormEdit v-bind="modalProps"></MealFormEdit>
        </template>
        <template #footer></template>
    </ModalComp>
</template>

<style scoped>
.item-div {
    display: flex;
    min-width: 200px;
    max-width: 40%;
}

.item {
    min-width: 100px;
    flex-grow: 2;
}

.edit {
    color: indigo;
    max-width: 1.5rem;
}

.del {
    color: crimson;
    max-width: 1.5rem;
}
</style>