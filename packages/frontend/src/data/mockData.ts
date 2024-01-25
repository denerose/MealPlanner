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
            date: new Date("2023-01-01"),
            day: 'Sunday',
            dinner: mealsMock()[0]
        },
        {
            date: new Date("2023-01-02"),
            day: 'Monday',
            dinner: mealsMock()[1]
        },
        {
            date: new Date("2023-01-03"),
            day: 'Tuesday',
        },
        {
            date: new Date("2023-01-04"),
            day: 'Wednesday',
        },
        {
            date: new Date("2023-01-05"),
            day: 'Thursday',
        },
        {
            date: new Date("2023-01-06"),
            day: 'Friday',
        },
        {
            date: new Date("2023-01-07"),
            day: 'Saturday',
        },

    ]
}