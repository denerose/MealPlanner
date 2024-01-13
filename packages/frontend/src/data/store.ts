import { defineStore } from "pinia"
import { Meal, MealPlan } from "./types"
import { mealPlansMock } from "./mockData"
import { deleteMealFromServer, getMealsFromServer, postNewMealToServer, postUpdateMealToServer } from "./helpers"

const LOG = (msg: any) => { console.log(msg) }

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
                const newData = await getMealsFromServer()
                this.meals = newData
            } catch (error) {
                LOG(String(error))
            }
        },

        async fetchMealPlans() {
            try {
                const newData = await mealPlansMock()
                this.mealPlan = newData
            } catch (error) {
                LOG(String(error))
            }

        },

        async pushNewMeal(newMeal: Meal) {
            try {
                const confirmedMeal = await postNewMealToServer(newMeal)
                if (confirmedMeal === undefined) throw Error('new meal returned undefined')
                this.meals.push(confirmedMeal)
            } catch (error) {
                LOG(error)
            }
        },

        async pushUpdatedMeal(updatedMeal: Meal) {
            try {
                const confirmedMeal = await postUpdateMealToServer(updatedMeal)
                if (confirmedMeal === undefined) throw Error('update meal returned undefined')
                this.meals.push(confirmedMeal)
            } catch (error) {
                LOG(error)
            }
        },

        async pushDeleteMeal(idToRemove: number) {
            try {
                deleteMealFromServer(idToRemove)
            } catch (error) {
                LOG(error)
            }
        },

    },
})