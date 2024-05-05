import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WeekPlanPage from '../views/WeekPlanPage.vue'
// import EditPlanForm from '../components/editplans/EditPlanForm.vue'
import EditPlanPage from '../views/EditPlanPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/plan',
        name: 'plan',
        component: WeekPlanPage,
        children: [
            {
                path: ':id',
                component: EditPlanPage,
                props: true
            },
        ]
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