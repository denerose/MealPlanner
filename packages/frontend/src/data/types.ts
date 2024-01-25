
export interface Meal {
    id?: number,
    mealName: string,
    description?: string,
    ingredients: Ingredient[]
}

export interface Ingredient {
    id?: number,
    ingredientName: string
}

export interface MealPlan {
    id?: number
    date?: string | Date
    day: string
    dinner?: Meal
}