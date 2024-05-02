<script setup lang="ts">
import type { MealPlan } from '../data/types';
// import NewMealPlanBtn from './NewMealPlanBtn.vue';


const props = defineProps<{
    plan: MealPlan
}>();

const linkID = props.plan.id

</script>

<template>
    <div class="card">
        <div class="card-header">
            <h6>{{ plan.day }}</h6>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title fs-6 md:fs-4 lg:fs-3">{{ plan.dinner?.mealName }}
            </h5>
            <div class="car-text">
                <p v-if="props.plan.lunch">Lunch: {{ plan.lunch?.mealName }}</p>
            </div>
        </div>
        <div class="card-footer">
            <router-link :to="'/' + linkID"><button class="btn btn-success">
                    edit </button>
            </router-link>
        </div>
    </div>
</template>