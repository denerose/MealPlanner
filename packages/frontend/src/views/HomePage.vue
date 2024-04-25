<script setup lang="ts">
import { Suspense } from 'vue';
import MealTable from '../components/MealTable.vue';

</script>

<template>
    <div class="card">
        <Suspense>
            <MealTable />
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>

<style scoped></style>