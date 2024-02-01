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
    <div>
        <button @click="openModal">New Meal</button>
        <NewMealModal :isOpen="isModalOpened" @meal-modal-close="closeModal" @submit="submitHandler" name="new-meal-modal">
        </NewMealModal>
    </div>
</template>

<style scoped></style>