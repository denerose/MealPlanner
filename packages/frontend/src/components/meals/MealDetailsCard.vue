<script setup lang="ts">
import { useDataStore } from '../../data/store';
import { XMarkIcon, PencilSquareIcon, MinusCircleIcon } from '@heroicons/vue/24/outline';
import { ValidMeal } from '../../data/types';
import { ref } from 'vue';
import MealFormEdit from './MealFormEdit.vue';
import ModalComp from '../ModalComp.vue';

const store = useDataStore()

const props = defineProps<{
    meal: ValidMeal
}>()

const thisMeal = ref(props.meal)

const isModalOpened = ref(false);

const openModal = (_passedProps: ValidMeal) => {
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
    <div class="card h-100">
        <div class="card-header p-1">
            <div class="d-flex">
                <span class="item me-auto flex-grow"><strong>{{ thisMeal.mealName }}</strong></span>
                <span class="ms-auto">
                    <PencilSquareIcon @click="openModal(thisMeal)" class="edit"></PencilSquareIcon>
                    <XMarkIcon @click="store.pushDeleteMeal(Number(thisMeal.id))" class="del">
                    </XMarkIcon>
                </span>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <span v-if="thisMeal.qualities">
                    <span class="d-none d-lg-inline">Qualities: </span>
                    <span v-if="thisMeal.qualities.outdoorCooking" class="qual-icon" title="outside cooking">🔥</span>
                    <span v-if="thisMeal.qualities.isHighVeg" class="qual-icon" title="lots of veggies">🥦</span>
                    <span v-if="thisMeal.qualities.isCreamy" class="qual-icon" title="creamy">🫕</span>
                    <span v-if="thisMeal.qualities.isHighCarb" class="qual-icon" title="high carb">🥐</span>
                    <span v-if="thisMeal.qualities.makesLunch" class="qual-icon" title="makes lunch">🥡</span>
                </span>
            </li>
            <li v-for="ingredient in thisMeal.ingredients" class="list-group-item">
                <div class="d-flex"><span class="item">{{ ingredient.ingredientName
                        }}</span>
                    <MinusCircleIcon @click="store.removeIngredient(ingredient, thisMeal)" class="del ms-auto">
                    </MinusCircleIcon>
                </div>
            </li>
        </ul>
    </div>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header></template>
        <template #content>
            <MealFormEdit v-bind="meal"></MealFormEdit>
        </template>
        <template #footer></template>
    </ModalComp>
</template>

<style scoped>
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