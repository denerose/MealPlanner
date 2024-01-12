import { Meal, MealPlan } from "./types"

export function mealsMock(): Meal[] {
    return [{
        mealName: 'pasta',
        ingredients: []
    },
    {
        mealName: 'soup',
        ingredients: []
    }]
}

export function mealPlansMock(): MealPlan[] {
    return [
        {
            day: 'Sunday',
            dinner: mealsMock()[0]
        },
        {
            day: 'Monday',
            dinner: mealsMock()[1]
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

    ]
}