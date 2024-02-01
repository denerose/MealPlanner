<script setup lang="ts">
import { ref } from 'vue';
import NewMealModal from './NewMealModal.vue';

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
    <NewMealModal :isOpen="isModalOpened" @meal-modal-close="closeModal" @submit="submitHandler" name="new-meal-modal">
    </NewMealModal>
</template>

<style scoped></style>