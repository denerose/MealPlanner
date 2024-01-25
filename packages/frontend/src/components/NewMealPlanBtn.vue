<script setup lang="ts">
import { ref } from 'vue';
import ModalComp from './ModalComp.vue';
import { MealPlan } from '../data/types';

const props = defineProps<{
    plan?: MealPlan
}>()

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
    <button @click="openModal">Add Meal</button>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header>Meal Allocation</template>
        <template #content>
        </template>
        <template #footer></template>
    </ModalComp>
</template>
<style scoped></style>