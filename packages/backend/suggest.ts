import { Meal, MealPlan } from '@prisma/client'
import { findMealByID, getAllMeals } from './dbHelpers';

export type DayOfWeek =
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

// should rules be an array of functions so I can map over them? lunchNights would need to be extracted to its own set/get? or make rules.appliedRulesArray?

namespace rules {
    const lunchNights: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday']

    export function getLunchNights() {
        return lunchNights
    }

    export function isRepeat(currentMeal: Meal, option: Meal): boolean {
        return currentMeal.id === option.id
    }

    export function makeLunch(previousDay: MealPlan, option: Meal): boolean {
        if (rules.getLunchNights().includes(previousDay.day as DayOfWeek)) {
            return option.makesLunch
        }
        else return true
    }
}

// export function setRules() {}

export async function suggest(currentDay?: MealPlan): Promise<Meal> {
    const allMeals = await getAllMeals()
    // if no currentDay supplied, just choose a random meal (in case earlier call getYesterdayPlan fails)
    if (!currentDay) {
        const randomSuggestion = allMeals[Math.floor(Math.random() * allMeals.length)]
        console.log('random all meal index: ' + randomSuggestion)
        return randomSuggestion
    }
    const currentMeal = await findMealByID(Number(currentDay.mealId))
    // if no previous meal, just choose any random meal.
    if (currentMeal === null || currentMeal === undefined) {
        const anyMeal = allMeals[Math.floor(Math.random() * allMeals.length)]
        console.log('any meal: ' + anyMeal)
        return anyMeal
    }
    const validOptions = allMeals.filter((item) => {
        if (rules.isRepeat(currentMeal, item)) return false
        else return rules.makeLunch(currentDay, item)
    })
    if (validOptions.length < 0) throw Error("no meal values match current rules")
    const randomIndex = Math.floor(Math.random() * validOptions.length)
    console.log('random valid index: ' + randomIndex)
    const suggestion = validOptions[randomIndex]
    return suggestion
}