
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
    date?: Date
    day: string
    dinner?: Meal
}