<script setup lang="ts">
import { ref } from 'vue';
import type { MealPlan } from '../../data/types';
import EditPlanFormMini from '../editplans/EditPlanFormMini.vue';
import EditPlanForm from '../editplans/EditPlanForm.vue';
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import ModalComp from '../ModalComp.vue';


const props = defineProps<{
    plan: MealPlan
}>();

const shortDay = props.plan.day.substring(0, 3)


// modal controls
const isModalOpened = ref(false);

const openModal = (_passedProps: MealPlan) => {
    document.body.classList.add('modal-open')
    isModalOpened.value = true;
};
const closeModal = () => {
    document.body.classList.remove('modal-open')
    isModalOpened.value = false;
};

const submitHandler = () => {
    closeModal()
}

</script>

<template>
    <div class="card">
        <div class="card-header d-flex pe-1">
            <h6 class="d-block d-sm-none d-lg-block">{{ plan.day }}</h6>
            <h6 class="d-none d-sm-block d-lg-none">{{ shortDay }}</h6>
            <PencilSquareIcon @click="openModal(plan)" class="icon ms-auto" title="quick edit"></PencilSquareIcon>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div class="card-title">
                <span>Dinner: </span>
                <span>{{ props.plan.dinner?.mealName }}</span>
            </div>
            <div class="card-text">
                <span> </span>
                <span v-if="props.plan.lunch">Lunch: {{ props.plan.lunch.mealName }}</span>
                <!-- <span v-else>No lunch</span> -->
            </div>
        </div>
        <ModalComp :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="plan-modal">
            <template #header></template>
            <template #content>
                <EditPlanFormMini v-bind="plan" class="d-md-none"></EditPlanFormMini>
                <hr class="d-md-none" />
                <EditPlanForm v-bind="plan" class="d-none d-md-block"></EditPlanForm>
            </template>
            <template #footer></template>
        </ModalComp>
    </div>
</template>