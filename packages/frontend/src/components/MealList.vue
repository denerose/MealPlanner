<script setup lang="ts">
import { ref } from "vue";
import { useDataStore } from '../data/store';
import { XMarkIcon, PencilSquareIcon, MinusCircleIcon } from '@heroicons/vue/24/outline';
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
    <div class="card">
        <div class="list-div">
            <ul>
                <li v-for="meal in store.meals">
                    <div class="item-div">
                        <span class="item">{{ meal.mealName }}</span>
                        <PencilSquareIcon @click="openModal(meal)" class="edit"></PencilSquareIcon>
                        <XMarkIcon @click="store.pushDeleteMeal(Number(meal.id))" class="del">
                        </XMarkIcon>
                    </div>
                    <ul>
                        <li v-for="ingredient in meal.ingredients">
                            <div class="item-div"><span class="item">{{ ingredient.ingredientName
                            }}</span>
                                <MinusCircleIcon @click="store.removeIngredient(ingredient, meal)" class="del">
                                </MinusCircleIcon>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header>Editing: {{ modalProps.mealName }}</template>
        <template #content>
            <MealFormEdit v-bind="modalProps"></MealFormEdit>
        </template>
        <template #footer></template>
    </ModalComp>
</template>

<style scoped>
.list-div {
    min-width: 150px;
    max-width: 400px;
}

.item-div {
    display: flex;
}

.item {
    min-width: 100px;
    flex-grow: 2;
}

.edit {
    color: rgb(79, 57, 108);
    width: 1.5rem;
}

.del {
    color: crimson;
    width: 1.5rem;
}
</style>