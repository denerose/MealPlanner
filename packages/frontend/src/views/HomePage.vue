<script setup lang="ts">
import { Suspense } from 'vue';
import MealTable from '../components/MealTable.vue';
import LoadingWheel from '../components/LoadingWheel.vue';

</script>

<template>
    <div class="container page-frame">
        <Suspense>
            <MealTable />
            <template #fallback>
                <LoadingWheel />
            </template>
        </Suspense>
    </div>
</template>

<style scoped></style>