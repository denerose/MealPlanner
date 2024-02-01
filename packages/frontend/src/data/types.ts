
export interface Meal {
    id?: number,
    mealName: string,
    description?: string,
    ingredients: Ingredient[],
    qualities?: Quals
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

export interface Quals {
    isHighCarb?: boolean,
    isHighVeg?: boolean,
    makesLunch?: boolean,
    isCreamy?: boolean,
    isAcidic?: boolean,
    outdoorCooking?: boolean
}

export interface RawMeal {
    id: number,
    mealName: string,
    description: string,
    ingredients: Ingredient[],
    isHighCarb: boolean,
    isHighVeg: boolean,
    makesLunch: boolean,
    isCreamy: boolean,
    isAcidic: boolean,
    outdoorCooking: boolean,
}
