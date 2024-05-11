export interface Meal {
  id?: number;
  mealName: string;
  description?: string;
  ingredients: Ingredient[];
  qualities?: Quals;
}

export interface ValidMeal {
  id?: number;
  mealName: string;
  description?: string;
  ingredients: Ingredient[];
  qualities: Quals;
}

export interface Ingredient {
  id?: number;
  ingredientName: string;
}

export interface MealPlan {
  id?: number;
  date: string | Date;
  day: DayOfWeek;
  dinner?: Meal;
  lunch?: Meal;
}

export interface Quals {
  isHighCarb: boolean;
  isHighVeg: boolean;
  makesLunch: boolean;
  isCreamy: boolean;
  isAcidic: boolean;
  outdoorCooking: boolean;
}

export interface RawMeal {
  id: number;
  mealName: string;
  description: string;
  ingredients: Ingredient[];
  MealPlan?: MealPlan[];
  isHighCarb: boolean;
  isHighVeg: boolean;
  makesLunch: boolean;
  isCreamy: boolean;
  isAcidic: boolean;
  outdoorCooking: boolean;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface SettingsData {
  preset: string;
  lunchRule: boolean;
  carbRule: boolean;
  acidRule: boolean;
}
