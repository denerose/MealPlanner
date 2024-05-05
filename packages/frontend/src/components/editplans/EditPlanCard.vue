<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { MealPlan } from '../../data/types';
import EditPlanForm from './EditPlanForm.vue';
import { onMounted, ref } from 'vue';
// import { useDataStore } from '../../data/store';
// import { ref } from 'vue';

// const store = useDataStore()
const router = useRouter()
const route = useRoute()

const props = defineProps<{
    plan: MealPlan
}>();

const linkID = String(props.plan.id)
const routeID = ref(route.params.id)

function handleClick() {
    const editDiv = document.getElementById(`div-${linkID}`)
    if (editDiv) editDiv.toggleAttribute("hidden")
    router.push({ path: `/plan/${linkID}` })
    const allCards = Array.from(document.getElementsByClassName('edit-card-header'))
    allCards.forEach((e) => e.classList.remove('text-bg-success'))
    const activeCard = document.getElementById(`plan-card-header-${linkID}`)
    activeCard?.classList.add('text-bg-success')
}

onMounted(() => {
    if (linkID === routeID.value) {
        const activeCard = document.getElementById(`plan-card-header-${linkID}`)
        activeCard?.classList.add('text-bg-success')
    }
})

</script>

<template>
    <div class="card edit-card" :id="`plan-card-${linkID}`" @click="handleClick">
        <div class="card-header edit-card-header" :id="`plan-card-header-${linkID}`">{{ props.plan.day }}</div>
        <div class="card-body">
            <div v-if="props.plan.dinner">{{ props.plan.dinner.mealName }}</div>
            <div v-else>Add dinner</div>
            <div class="d-sm-none" :id="`div-${linkID}`" hidden>
                <EditPlanForm v-bind="props.plan"></EditPlanForm>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-card {
    cursor: pointer;

}
</style>