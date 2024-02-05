<script setup lang="ts">
import { HomeIcon, BookOpenIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <nav>
        <router-link to="/">
            <home-icon class="icon" />Home
        </router-link>
        <router-link :to="{ name: 'meals' }"><book-open-icon class="icon" />
            <div>Meals</div>
        </router-link>
        <router-link :to="{ name: 'settings' }">
            <cog6-tooth-icon class="icon" />
            <span>Settings</span>
        </router-link>
    </nav>
</template>

<style scoped>
.icon {
    width: 1.4rem;
    height: 1.4rem;
    justify-self: flex-start;
}

nav {
    display: flex;
    justify-content: flex-start;
}

a {
    display: flex;
    min-width: 120px;
    justify-content: space-between;
    align-items: center;
    gap: 1px;
    padding: 0.1rem 0.6rem;
}
</style>