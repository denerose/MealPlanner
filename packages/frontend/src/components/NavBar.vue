<script setup lang="ts">
import { HomeIcon, BookOpenIcon, Cog6ToothIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <home-icon class="icon" /><span> | Home</span>
                        </router-link>
                    </li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name: 'planner' }"><calendar-days-icon
                                class="icon" />
                            <span> | Next Week</span>
                        </router-link>
                    </li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name: 'meals' }"><book-open-icon
                                class="icon" />
                            <span> | Meals</span>
                        </router-link>
                    </li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name: 'settings' }">
                            <cog6-tooth-icon class="icon" />
                            <span> | Settings</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <router-link class="nav-link" to="/"><span class="navbar-brand">🍽 myMealPlanner</span></router-link>

        </div>
    </nav>
</template>

<style scoped>
.icon {
    width: 1.4rem;
    height: 1.4rem;
    justify-self: flex-start;
}

/* nav {
    display: flex;
    justify-content: flex-start;
} */

/* a {
    display: flex;
    min-width: 5rem;
    justify-content: space-around;
    align-items: center;
    gap: 0.5rem;
    padding: 0.1rem 0.6rem;
} */
</style>