<script setup lang="ts">
import { ref } from 'vue';
import ModalComp from './ModalComp.vue';
// import { Meal } from '../data/types';
// import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import MealForm from './MealForm.vue';

// const props = defineProps<Meal>()

// modal controls
const isModalOpened = ref(false);

const openModal = () => {
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
    <button @click="openModal">New Meal</button>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header>Create Meal
        </template>
        <template #content>
            <MealForm />
        </template>
        <template #footer></template>
    </ModalComp>
</template>

<style scoped></style>