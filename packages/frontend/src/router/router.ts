import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/settings',
        name: 'settings',
        component: () =>
            import('../views/SettingsPage.vue')
    },
    {
        path: '/meals',
        name: 'meals',
        component: () =>
            import('../views/MealsPage.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router