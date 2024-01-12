import { defineStore } from "pinia"
import { Meal, MealPlan } from "./types"
import { mealPlansMock, mealsMock } from "./mockData"

export const useDataStore = defineStore('data', {
    state: () => ({
        meals: [{
            mealName: 'pasta',
            ingredients: []
        },
        {
            mealName: 'soup',
            ingredients: []
        }
        ] as Meal[],

        mealPlan: [
            {
                day: 'Sunday',
            },
            {
                day: 'Monday',
            },
            {
                day: 'Tuesday',
            },
            {
                day: 'Wednesday',
            },
            {
                day: 'Thursday',
            },
            {
                day: 'Friday',
            },
            {
                day: 'Saturday',
            },

        ] as MealPlan[]
    }),
    getters: {
        getMealList(state) {
            return state.meals
        }
    },
    actions: {
        async fetchMealList() {
            try {
                const newData = await mealsMock()
                this.meals = newData
                return true
            } catch (error) {
                console.log(error)
            }
        },

        async fetchMealPlans() {
            try {
                const newData = await mealPlansMock()
                this.mealPlan = newData
            } catch (error) {
                console.log(error)
            }

        }

    },
})