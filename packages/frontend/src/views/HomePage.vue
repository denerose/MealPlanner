<script setup lang="ts">
import { Suspense } from 'vue';
import MealTable from '../components/MealTable.vue';

</script>

<template>
    <h2>This is the home page!</h2>
    <Suspense>
        <MealTable />
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>

<style scoped></style>