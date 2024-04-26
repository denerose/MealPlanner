import { defineStore } from "pinia"
import { Ingredient, MealPlan, ValidMeal } from "./types"
// import { mealPlansMock } from "./mockData"
import { createNextPlansOnServer, dayFromDate, deleteIngredientFromServer, deleteMealFromServer, disconnectIngredientFromMeal, getIngredientsFromServer, getMealPlansFromServer, getMealsFromServer, getNextPlansFromServer, postNewMealToServer, postUpdateMealPlanToServer, postUpdateMealToServer } from "./helpers"

const LOG = (msg: any) => { console.log(msg) }

export const useDataStore = defineStore('data', {

    state: () => ({
        meals: [] as ValidMeal[],

        mealPlans: [] as MealPlan[],

        nextMealPlans: [] as MealPlan[],

        allIngredients: [] as Ingredient[]
    }),

    getters: {

    },

    actions: {
        async fetchMealList() {
            try {
                const newData = await getMealsFromServer() as ValidMeal[]
                this.meals = newData
            } catch (error) {
                LOG(String(error))
            }
        },

        async fetchMealPlans() {
            try {
                // const newData = await mealPlansMock()
                const newData = await getMealPlansFromServer()
                this.mealPlans = this.sortedMealPlans(newData)
                const nextWeek = await getNextPlansFromServer()
                this.nextMealPlans = nextWeek
            } catch (error) {
                LOG(String(error))
            }
        },

        sortedMealPlans(rawPlans: MealPlan[]) {
            const map = {
                'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6,
                'Sunday': 7
            }
            return rawPlans.toSorted((a, b) => {
                return map[a.day] - map[b.day]
            })
        },

        async fetchIngredients() {
            try {
                const newData = await getIngredientsFromServer()
                this.allIngredients = newData
            } catch (error) {
                LOG(String(error))
            }
        },
        async pushNewMeal(newMeal: ValidMeal) {
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

        async pushUpdatedMeal(updatedMeal: ValidMeal) {
            try {
                const oldIndex = this.meals.findIndex(meal => meal.id === updatedMeal.id)
                const ingsToRemove = this.oldIngredientsToRemove(this.meals[oldIndex].ingredients, updatedMeal.ingredients)
                const confirmedMeal = await postUpdateMealToServer(updatedMeal)
                if (confirmedMeal === undefined) throw Error('update meal returned undefined')
                if (ingsToRemove.length > 0) {
                    ingsToRemove.map(async (item) => await disconnectIngredientFromMeal(item, Number(updatedMeal.id)))
                }
                this.$patch((_state) => {
                    this.meals.splice(oldIndex, 1, confirmedMeal)
                    this.meals[oldIndex].ingredients = updatedMeal.ingredients
                })
            } catch (error) {
                LOG(error)
            }
        },

        async createNewWeek() {
            const newWeek = await createNextPlansOnServer()
            this.nextMealPlans = newWeek
        },

        async pushUpdatedMealPlan(updatedPlan: MealPlan) {
            if (updatedPlan.date) { updatedPlan.day = dayFromDate(new Date(updatedPlan.date)) }
            const confirmedPlan = await postUpdateMealPlanToServer(updatedPlan)
            if (confirmedPlan === undefined) throw Error('updated plan returned undefined')
            const oldIndexCurr = this.mealPlans.findIndex(plan => plan.id === updatedPlan.id)
            if (oldIndexCurr >= 0) {
                this.mealPlans.splice(oldIndexCurr, 1, confirmedPlan)
            }
            else {
                const oldIndexNext = this.nextMealPlans.findIndex(plan => plan.id === updatedPlan.id)
                this.nextMealPlans.splice(oldIndexNext, 1, confirmedPlan)
            }
        },

        oldIngredientsToRemove(oldIngs: Ingredient[], newIngs: Ingredient[]): Ingredient[] {
            const idsToRemove: Ingredient[] = []
            oldIngs.map((oldItem): void => {
                if (newIngs.some(newItem => newItem.ingredientName === oldItem.ingredientName)) {
                    return
                } else { idsToRemove.push(oldItem) }
            })
            return idsToRemove as Ingredient[]
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

        async removeIngredient(ingToRemove: Ingredient, meal: ValidMeal) {
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
        },

        pushDeleteIngredient(ingToDelete: Ingredient) {
            if (ingToDelete.id === undefined) throw Error('no such ing id')
            deleteIngredientFromServer(ingToDelete.id)
            const newArray = this.allIngredients.filter(ing => ing.id !== ingToDelete.id)
            this.$patch({ allIngredients: newArray })
        }

    },
})