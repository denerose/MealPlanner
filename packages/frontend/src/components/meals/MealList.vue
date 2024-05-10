<script setup lang="ts">
import { ref } from "vue";
import { useDataStore } from '../../data/store';
import { XMarkIcon, PencilSquareIcon, MinusCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import ModalComp from "./ModalComp.vue"
import MealFormEdit from "./meals/MealFormEdit.vue";
import { Ingredient, ValidMeal } from "../../data/types";

const store = useDataStore()
if (store.meals.length == 0) { store.fetchMealList() }

// modal controls
const isModalOpened = ref(false);
const modalProps = ref<ValidMeal>({
    id: undefined,
    mealName: 'default',
    description: '',
    ingredients: [] as Ingredient[],
    qualities: {
        isHighCarb: false,
        isHighVeg: false,
        makesLunch: false,
        isCreamy: false,
        isAcidic: false,
        outdoorCooking: false,
    }
})

const openModal = (passedProps: ValidMeal) => {
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
    <div class="container">
        <div class="card-body">
            <ul class="d-flex">
                <li v-for="meal in store.meals" class="card m-1">
                    <h6 class="item-div card-header">
                        <span class="item">{{ meal.mealName }}</span>
                        <PencilSquareIcon @click="openModal(meal)" class="edit"></PencilSquareIcon>
                        <XMarkIcon @click="store.pushDeleteMeal(Number(meal.id))" class="del">
                        </XMarkIcon>
                    </h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span v-if="meal.qualities">
                                Qualities:
                                <span v-if="meal.qualities.outdoorCooking" class="qual-icon"
                                    title="outside cooking">🔥</span>
                                <span v-if="meal.qualities.isHighVeg" class="qual-icon"
                                    title="lots of veggies">🥦</span>
                                <span v-if="meal.qualities.isCreamy" class="qual-icon" title="creamy">🫕</span>
                                <span v-if="meal.qualities.isHighCarb" class="qual-icon" title="high carb">🥐</span>
                                <span v-if="meal.qualities.makesLunch" class="qual-icon" title="makes lunch">🥡</span>
                            </span>
                        </li>
                        <li v-for="ingredient in meal.ingredients" class="list-group-item">
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
    cursor: pointer;
}

.del {
    color: crimson;
    width: 1.5rem;
    cursor: pointer;
}

.qual-icon {
    padding: 0.2rem;
}
</style>