<script setup lang="ts">
import { Suspense } from 'vue';
import MealTable from '../components/MealTable.vue';

</script>

<template>
    <div class="card">
        <h2>This is the home page!</h2>
        <Suspense>
            <MealTable />
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>

<style scoped></style>