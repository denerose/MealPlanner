<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import EditPlanFormMini from '../editplans/EditPlanFormMini.vue';
import { MealPlan } from '../../data/types';


defineProps<{
    title?: string,
    plan: MealPlan
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()
</script>

<template>
    <VueFinalModal class="d-flex justify-content-center align-items-center" content-class="card">
        <h1 class="card-header">
            {{ title }}
        </h1>
        <div class="card-body">
            <EditPlanFormMini :plan="$props.plan"></EditPlanFormMini>
            <p>{{ plan.day }}</p>
        </div>
        <button class="btn btn-primary" @click="emit('confirm')">
            Confirm
        </button>
    </VueFinalModal>
</template>
