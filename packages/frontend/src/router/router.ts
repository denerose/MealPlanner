import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EditPlanPage from '../views/EditPlanPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        children: [{
            path: '/:id',
            component: EditPlanPage
        }]
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