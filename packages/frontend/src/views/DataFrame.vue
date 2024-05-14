<script setup lang="ts">
import NavBar from '.././components/NavBar.vue';
import { useDataStore } from '../data/store';

const store = useDataStore();

if (store.nextMealPlans.length < 7) {
    await store.fetchMealList()
    await store.fetchMealPlans()
    await store.createNewWeek()
}
</script>

<template>
    <header class="bg-white text-dark border-bottom sticky-top p-2" style="--bs-bg-opacity: .9;">
        <Suspense>
            <nav-bar />
        </Suspense>
    </header>
    <div class="container-lg">
        <router-view />
        <footer class="page-frame bg-white p-2" style="--bs-bg-opacity: .9;"><small>
                <span>myMealPlanner by <a href="">@denerose</a></span>
                <br />
                <span>Photo by <a
                        href="https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/">Ella
                        Olsson</a></span>
            </small></footer>
    </div>
</template>

<style scoped>
footer {
    text-align: center;
    border: 1px solid gold;
    border-radius: 5px;
}
</style>