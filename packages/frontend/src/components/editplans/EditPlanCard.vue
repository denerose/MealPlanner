<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { MealPlan } from '../../data/types';
// import { useDataStore } from '../../data/store';
// import { ref } from 'vue';

// const store = useDataStore()
const router = useRouter()

const props = defineProps<{
    plan: MealPlan
}>();

const linkID = String(props.plan.id)


function handleClick() {
    const editDiv = document.getElementById(`div-${linkID}`)
    if (editDiv) editDiv.toggleAttribute("hidden")
    router.push({ path: `/plan/${linkID}` })
}


</script>

<template>
    <div class="card">
        <p>{{ linkID }}</p>
        <button class="btn" @click="handleClick">Button</button>
        <div class="d-sm-none" :id="`div-${linkID}`" hidden>Content</div>
    </div>

</template>