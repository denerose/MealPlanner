<script setup lang="ts">
import { Suspense } from 'vue';
// import MealTable from '../components/MealTable.vue';
import LoadingWheel from '../components/LoadingWheel.vue';
import HomeTable from '../components/home/HomeTable.vue';

</script>

<template>
    <div class="container page-frame bg-white" style="--bs-bg-opacity: .9;">
        <Suspense>
            <HomeTable />
            <template #fallback>
                <LoadingWheel />
            </template>
        </Suspense>
    </div>
</template>

<style scoped></style>