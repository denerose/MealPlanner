<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { MealPlan } from '../../data/types';
import EditPlanFormMini from './EditPlanFormMini.vue';
import QualsSpan from '../QualsSpan.vue'
import { onMounted, ref, watch } from 'vue';

const router = useRouter()
const route = useRoute()

const props = defineProps<{
    plan: MealPlan
}>();

const linkID = String(props.plan.id)
const routeID = ref(route.params.id)

const shortDay = props.plan.day.substring(0, 3)

function handleClick() {
    const editDiv = document.getElementById(`div-${linkID}`)
    if (editDiv) editDiv.toggleAttribute("hidden")
    router.push({ path: `/plan/${linkID}` })
}

onMounted(() => {
    if (linkID === routeID.value) {
        const activeCard = document.getElementById(`plan-card-header-${linkID}`)
        activeCard?.classList.add('text-bg-success')
    }
})

watch(() => route.params.id, (newId, oldId) => {
    if (newId === linkID) {
        const activeCard = document.getElementById(`plan-card-header-${linkID}`)
        activeCard?.classList.add('text-bg-success')
    }
    else if (oldId === linkID && newId !== linkID) {
        const activeCard = document.getElementById(`plan-card-header-${linkID}`)
        activeCard?.classList.remove('text-bg-success')
    }
})

</script>

<template>
    <div class="card edit-card" :id="`plan-card-${linkID}`">
        <div class="card-header edit-card-header" :id="`plan-card-header-${linkID}`" @click="handleClick">
            <h6 class="d-block d-sm-none d-lg-block">{{ plan.day }}</h6>
            <h6 class="d-none d-sm-block d-lg-none">{{ shortDay }}</h6>
        </div>
        <div class="card-body">
            <div v-if="props.plan.dinner" @click="handleClick" class="d-flex">
                <strong>{{ props.plan.dinner.mealName }}</strong>
                <QualsSpan v-if="props.plan.dinner.id" :mealID="props.plan.dinner.id" class="ms-auto" />
            </div>
            <div v-else @click="handleClick">Add dinner</div>
            <div class="d-sm-none" :id="`div-${linkID}`" hidden>
                <EditPlanFormMini v-bind="props.plan"></EditPlanFormMini>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-card {
    cursor: pointer;

}
</style>