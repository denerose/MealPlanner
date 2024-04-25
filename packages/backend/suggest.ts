import { Meal, MealPlan } from '@prisma/client'
import { findMealByID, getAllMeals, getFutureDayPlan, getSettings } from './dbHelpers.js';
import { format } from "date-fns";

export type DayOfWeek =
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

// should rules be an array of functions so I can map over them? lunchNights would need to be extracted to its own set/get? or make rules.appliedRulesArray?

namespace rules {
    const lunchNights: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday']

    export function getLunchNights() {
        return lunchNights
    }

    export function isRepeat(currentMeal: Meal, option: Meal, nextDay?: Meal | undefined): boolean {
        return currentMeal.id === option.id
    }

    /** returns true if double carbs */
    export function doubleCarbs(currentMeal: Meal, option: Meal, nextMealPlan?: Meal): boolean {
        if (currentMeal.isHighCarb || nextMealPlan?.isHighCarb) return option.isHighCarb
        else return false
    }

    export function meetsLunchRules(previousDay: MealPlan, option: Meal): boolean {
        if (rules.getLunchNights().includes(previousDay.day as DayOfWeek)) {
            return option.makesLunch
        }
        else return true
    }
}

export async function getValidOptionsList(currentDay: MealPlan): Promise<Meal[]> {
    const settings = await getSettings('default')
    if (settings === undefined) throw Error('no settings found')

    const allMeals = await getAllMeals()

    const currentMeal = await findMealByID(Number(currentDay.mealId))
    if (!currentMeal) return allMeals

    const futureDay = await getFutureDayPlan(String(currentDay.date), 2)
    let futureMeal: Meal | undefined = undefined
    if (futureDay !== undefined && futureDay.mealId !== null) { futureMeal = await findMealByID(futureDay.mealId) }

    /**
     * filter meal options to a valid list based on active rules
     */
    const validOptions = allMeals.filter((item: Meal) => {
        if (rules.isRepeat(currentMeal, item, futureMeal)) return false
        else if (settings.carbRule && rules.doubleCarbs(currentMeal, item, futureMeal)) return false
        else if (settings.lunchRule) return rules.meetsLunchRules(currentDay, item)
        else return true
    })

    if (validOptions.length <= 0) throw Error("no meal values match current rules")
    return validOptions
}

export async function suggest(previousDay?: MealPlan): Promise<Meal> {
    if (!previousDay) {
        const allMeals = await getAllMeals()
        const randomIndex = Math.floor(Math.random() * allMeals.length)
        console.log('random allMeals index: ' + randomIndex)
        const suggestion = allMeals[randomIndex]
        return suggestion
    }
    else {
        const validOptions = await getValidOptionsList(previousDay)
        const randomIndex = Math.floor(Math.random() * validOptions.length)
        console.log('random valid index: ' + randomIndex)
        const suggestion = validOptions[randomIndex]
        return suggestion
    }
}