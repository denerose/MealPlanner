<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDataStore } from '../../data/store';
import EditPlanCard from './EditPlanCard.vue';
import { useRoute } from 'vue-router';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';

const store = useDataStore();
const route = useRoute()

const editingNextWeek = ref(true)

const todayID = store.getTodayPlan().id

function isCurrentWeek(idToFind: number) {
    if (store.mealPlans.find(e => e.id === idToFind)) return true
    else return false
}

watch(() => route.params.id, (newId) => {
    if (isCurrentWeek(Number(newId))) {
        editingNextWeek.value = false
    }
    else editingNextWeek.value = true
})

</script>

<template>
    <div v-if="!editingNextWeek">
        <div class="d-flex flex-wrap py-1">
            <h2 class="col-12 col-sm-6 col-md-9 flex-fill">Editing Current Week</h2>
            <router-link class="col-12 col-sm-6 col-md-3 col-xl-2"
                :to="{ path: `/plan/${store.getNextMonday}` }"><button
                    class="btn btn-outline-success text-nowrap w-100">Edit
                    Next Week
                    <ChevronDoubleRightIcon class="icon" />
                </button></router-link>
        </div>
        <div class="card-group">
            <EditPlanCard v-for="plan in store.mealPlans" :plan="plan"></EditPlanCard>
        </div>
    </div>
    <div v-else>
        <div class="d-flex flex-wrap py-1">
            <h2 class="col-12 col-sm-6 col-md-9 flex-fill">Editing Next Week</h2>
            <router-link class="col-12 col-sm-6 col-md-3 col-xl-2" :to="{ path: `/plan/${todayID}` }"><button
                    class="btn btn-outline-success text-nowrap w-100">
                    <ChevronDoubleLeftIcon class="icon" />
                    Edit This Week
                </button></router-link>
        </div>
        <div class="card-group">
            <EditPlanCard v-for="plan in store.nextMealPlans" :plan="plan"></EditPlanCard>
        </div>
    </div>
</template>