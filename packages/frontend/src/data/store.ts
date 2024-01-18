import { defineStore } from "pinia"
import { Ingredient, Meal, MealPlan } from "./types"
import { mealPlansMock } from "./mockData"
import { deleteMealFromServer, disconnectIngredientFromMeal, getIngredientsFromServer, getMealsFromServer, postNewMealToServer, postUpdateMealToServer } from "./helpers"

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

        ] as MealPlan[],

        allIngredients: [] as Ingredient[]
    }),

    getters: {

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
        async fetchIngredients() {
            try {
                const newData = await getIngredientsFromServer()
                this.allIngredients = newData
            } catch (error) {
                LOG(String(error))
            }
        },
        async pushNewMeal(newMeal: Meal) {
            try {
                if (newMeal.ingredients.length < 1 || newMeal.ingredients === undefined) {
                    newMeal.ingredients = []
                }
                else { newMeal.ingredients = newMeal.ingredients.filter(ing => ing.ingredientName !== '') }
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
                const oldIndex = this.meals.findIndex(meal => meal.id === updatedMeal.id)
                const ingsToRemove = this.oldIngredientsToRemove(this.meals[oldIndex].ingredients, updatedMeal.ingredients)
                if (ingsToRemove.length > 0) { ingsToRemove.map(async (item) => await disconnectIngredientFromMeal(item, Number(updatedMeal.id))) }
                this.meals.splice(oldIndex, 1, confirmedMeal)
            } catch (error) {
                LOG(error)
            }
        },

        oldIngredientsToRemove(oldIngs: Ingredient[], newIngs: Ingredient[]): Ingredient[] {
            const idsToRemove = oldIngs.map((item) => { if (!newIngs.includes(item)) return item })
            if (idsToRemove === undefined) return []
            else return idsToRemove as Ingredient[]
        },

        async pushDeleteMeal(idToRemove: number) {
            try {
                await deleteMealFromServer(idToRemove)
                const newArray = this.meals.filter(meal => meal.id !== idToRemove)
                this.$patch({ meals: newArray })
            } catch (error) {
                LOG(error)
            }
        },

        async removeIngredient(ingToRemove: Ingredient, meal: Meal) {
            try {
                if (meal.id === undefined) throw Error(`no meal id`)
                await disconnectIngredientFromMeal(ingToRemove, Number(meal.id))
                const newIngArray = meal.ingredients.filter(ing => ing !== ingToRemove)
                meal.ingredients = newIngArray
                const oldIndex = this.meals.indexOf(meal)
                if (oldIndex === undefined) throw Error(`meal ${meal.mealName} missing from store`)
                this.meals.splice(oldIndex, 1, meal)
            } catch (error) {
                LOG(error)
            }

        },

        findIngIdByName(ingName: string): Ingredient {
            const result = this.allIngredients.find((ing) => ing.ingredientName === ingName)
            return result === undefined ? { ingredientName: ingName } : result
        }

    },
})