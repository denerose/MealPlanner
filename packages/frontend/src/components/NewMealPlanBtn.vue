<script setup lang="ts">
import { ref } from 'vue';
import ModalComp from './ModalComp.vue';
import { MealPlan } from '../data/types';
import MealPlanForm from './MealPlanForm.vue';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    plan: MealPlan
}>()

defineOptions({
    inheritAttrs: false
})

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
    <div></div>
    <PlusCircleIcon v-if="!props.plan.dinner" @click="openModal" class="addEditMeal"></PlusCircleIcon>
    <PencilSquareIcon v-else @click="openModal" class="addEditMeal"></PencilSquareIcon>
    <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
        <template #header>Meal Allocation - {{ props.plan.day }}</template>
        <template #content>
            <MealPlanForm v-bind="props.plan"></MealPlanForm>
        </template>
        <template #footer></template>
    </ModalComp>
</template>

<style scoped>
.addEditMeal {
    color: rgb(95, 52, 213);
    max-width: 1.5rem;
}
</style>