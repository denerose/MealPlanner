<script setup lang="ts">
import { Suspense } from 'vue';
// import MealTable from '../components/MealTable.vue';
import LoadingWheel from '../components/LoadingWheel.vue';
import HomeTable from '../components/home/HomeTable.vue';

</script>

<template>
    <div class="container page-frame bg-white mx-auto my-2 p-2 p-sm-3 p-md-5" style="--bs-bg-opacity: .9;">
        <Suspense>
            <HomeTable />
            <template #fallback>
                <LoadingWheel />
            </template>
        </Suspense>
    </div>
</template>

<style scoped></style>