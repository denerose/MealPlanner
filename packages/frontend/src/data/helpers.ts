// import { ISOStringFormat } from "date-fns";
import {
  DayOfWeek,
  Ingredient,
  Meal,
  MealPlan,
  Quals,
  RawMeal,
  SettingsData,
  ValidMeal,
} from "./types";

const SOURCE = "/api";
const LOG = (msg: any) => {
  console.log(msg);
};

// Meal options/list - function to get and send meal options to/from server
export async function postNewMealToServer(
  newMeal: ValidMeal
): Promise<ValidMeal | undefined> {
  try {
    const response = await fetch(`${SOURCE}/meal/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeal),
    });
    const result = (await response.json()) as RawMeal;
    if (result === undefined) throw Error("new meal not returned");
    LOG(`New meal: ${result.mealName}`);
    const confirmedMeal: ValidMeal = {
      id: result.id,
      mealName: result.mealName,
      description: result.description,
      ingredients: result.ingredients,
      qualities: rawQualsToObject(
        result.isHighCarb,
        result.isHighVeg,
        result.makesLunch,
        result.isCreamy,
        result.isAcidic,
        result.outdoorCooking
      ),
    };
    return confirmedMeal;
  } catch (error) {
    LOG(error);
  }
}

export function rawMealToValidMeal(rawMeal: RawMeal): ValidMeal {
  const validMeal = {
    id: rawMeal.id,
    mealName: rawMeal.mealName,
    description: rawMeal.description,
    ingredients: rawMeal.ingredients,
    qualities: rawQualsToObject(
      rawMeal.isHighCarb,
      rawMeal.isHighVeg,
      rawMeal.makesLunch,
      rawMeal.isCreamy,
      rawMeal.isAcidic,
      rawMeal.outdoorCooking
    ),
  };
  return validMeal;
}

// function flatMeal(newMeal: ValidMeal): RawMeal {
//   const flatMeal: RawMeal = {
//     id: Number(newMeal.id),
//     mealName: newMeal.mealName,
//     description: newMeal.description ? newMeal.description : "",
//     ingredients: newMeal.ingredients,
//     isHighCarb: newMeal.qualities.isHighCarb,
//     isHighVeg: newMeal.qualities.isHighVeg,
//     makesLunch: newMeal.qualities.makesLunch,
//     isCreamy: newMeal.qualities.isCreamy,
//     isAcidic: newMeal.qualities.isAcidic,
//     outdoorCooking: newMeal.qualities.outdoorCooking,
//   };
//   return flatMeal;
// }

function rawQualsToObject(
  isHighCarb: boolean,
  isHighVeg: boolean,
  makesLunch: boolean,
  isCreamy: boolean,
  isAcidic: boolean,
  outdoorCooking: boolean
): Quals {
  return {
    isHighCarb,
    isHighVeg,
    makesLunch,
    isCreamy,
    isAcidic,
    outdoorCooking,
  };
}

export async function getMealsFromServer(): Promise<Meal[]> {
  const response = await fetch(`${SOURCE}/meal/all`);
  const data = (await response.json()) as RawMeal[];
  LOG(`All meals: ${data.length}`);
  const mealList: ValidMeal[] = [];
  data.map((result) =>
    mealList.push({
      id: result.id,
      mealName: result.mealName,
      description: result.description,
      ingredients: result.ingredients,
      qualities: rawQualsToObject(
        result.isHighCarb,
        result.isHighVeg,
        result.makesLunch,
        result.isCreamy,
        result.isAcidic,
        result.outdoorCooking
      ),
    })
  );
  return mealList.sort(sortedMeals);
}

export async function getMealByIdFromServer(mealID: number): Promise<Meal> {
  const response = await fetch(`${SOURCE}/meal/${String(mealID)}`);
  const data = (await response.json()) as Meal;
  LOG(`Retrieved: ${data}`);
  return data;
}

export async function postUpdateMealToServer(
  updatedMeal: ValidMeal
): Promise<ValidMeal> {
  if (!updatedMeal.id) throw Error("no meal id");
  const response = await fetch(`${SOURCE}/meal/update/${updatedMeal.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMeal),
  });
  const data = (await response.json()) as RawMeal;
  return rawMealToValidMeal(data);
}

export async function deleteMealFromServer(idToDelete: number): Promise<void> {
  const response = await fetch(`${SOURCE}/meal/delete/${String(idToDelete)}`, {
    method: "DELETE",
  });
  LOG(`Deleted: ${response.json()}`);
}
// generic meal helpers

export function sortedMeals(a: ValidMeal, b: ValidMeal) {
  if (a.mealName < b.mealName) {
    return -1;
  }
  if (a.mealName > b.mealName) {
    return 1;
  }
  return 0;
}

// Ingredients - functions to delete or read ingredients
export async function disconnectIngredientFromMeal(
  ingToRemove: Ingredient,
  mealID: number
): Promise<void> {
  if (!ingToRemove.id) {
    throw Error(`no ingredient id`);
  }
  console.log(
    `ing to rmv: ${ingToRemove.id} ${ingToRemove.ingredientName} from meal: #${mealID}`
  );
  const response = await fetch(`${SOURCE}/meal/remove/${mealID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingToRemove),
  });
  LOG(response);
}
export async function getIngredientsFromServer(): Promise<Ingredient[]> {
  const response = await fetch(`${SOURCE}/ing/all`);
  const data = await response.json();
  LOG(`All ingredients: ${data.length}`);
  return data as Ingredient[];
}

export async function deleteIngredientFromServer(
  idToDelete: number
): Promise<void> {
  const response = await fetch(`${SOURCE}/ing/delete/${idToDelete}`, {
    method: "DELETE",
  });
  LOG(`Deleted: ${response.json()}`);
}

// Meal plans - functions to fetch and send meal plan associations to/from server

export async function getSuggestion(currentPlan: MealPlan): Promise<Meal> {
  const response = await fetch(`${SOURCE}/suggest/pick`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentPlan),
  });
  try {
    const data = await response.json();
    return data as Meal;
  } catch (error) {
    throw LOG(error);
  }
}

export async function getSuggestedMeals(
  currentPlan: MealPlan
): Promise<Meal[]> {
  const response = await fetch(`${SOURCE}/suggest/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentPlan),
  });
  try {
    const data = (await response.json()) as RawMeal[];
    const mealList: Meal[] = [];
    data.map((result) =>
      mealList.push({
        id: result.id,
        mealName: result.mealName,
        description: result.description,
        ingredients: result.ingredients,
        qualities: rawQualsToObject(
          result.isHighCarb,
          result.isHighVeg,
          result.makesLunch,
          result.isCreamy,
          result.isAcidic,
          result.outdoorCooking
        ),
      })
    );
    return mealList as Meal[];
  } catch (error) {
    throw LOG(error);
  }
}

export async function getMealPlansFromServer(): Promise<MealPlan[]> {
  const response = await fetch(`${SOURCE}/plan/current`);
  const data = (await response.json()) as MealPlan[];
  LOG(`Current meal plans: ${data.length}`);
  data.map((plan) => {
    if (plan.date !== undefined) {
      plan.date = cleanISODate(plan.date);
    }
  });
  return data;
}

export async function getNextPlansFromServer() {
  const response = await fetch(`${SOURCE}/plan/next`);
  const data = (await response.json()) as MealPlan[];
  LOG(`Next week: ${data.length}`);
  data.map((plan) => {
    if (plan.date !== undefined) {
      plan.date = cleanISODate(plan.date);
    }
  });
  return data;
}

export async function createNextPlansOnServer() {
  const response = await fetch(`${SOURCE}/plan/newweek`);
  const data = (await response.json()) as MealPlan[];
  LOG(`Next week created: ${data.length}`);
  data.map((plan) => {
    if (plan.date !== undefined) {
      plan.date = cleanISODate(plan.date);
    }
  });
  return data;
}

export async function postUpdateMealPlanToServer(
  updatedPlan: MealPlan
): Promise<MealPlan> {
  if (!updatedPlan.id) throw Error("no id on plan");
  const response = await fetch(`${SOURCE}/plan/update/${updatedPlan.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPlan),
  });
  const data = (await response.json()) as MealPlan;
  if (data.date !== undefined) {
    const newDate = cleanISODate(data.date);
    LOG(`updated plan for date: ${newDate}`);
    data.date = newDate;
  }
  return data;
}

export async function postNewPlanToServer(
  newPlan: MealPlan
): Promise<MealPlan | undefined> {
  try {
    const response = await fetch(`${SOURCE}/plan/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlan),
    });
    const result = (await response.json()) as MealPlan;
    if (result === undefined) throw Error("new meal plan not returned");
    LOG(`New plan: ${result.date}`);
    const confirmedPlan = result;
    if (result.date !== undefined) {
      const newDate = cleanISODate(result.date);
      confirmedPlan.date = newDate;
    }
    return confirmedPlan;
  } catch (error) {
    LOG(error);
  }
}

// settings functions

export async function getSettingsFromServer(): Promise<
  SettingsData | undefined
> {
  try {
    const response = await fetch(`${SOURCE}/settings/get`);
    const data = (await response.json()) as SettingsData;
    if (data === undefined) {
      // TODO add better way of handling this, make server side findOrCreate instead of findFirst
      return {
        preset: "default",
        lunchRule: false,
        carbRule: false,
        acidRule: false,
      };
    }
    return data;
  } catch (error) {
    LOG(error);
  }
}

export async function updateSettingsOnServer(newData: SettingsData) {
  const response = await fetch(`${SOURCE}/settings/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = (await response.json()) as SettingsData;
  if (result === undefined) throw Error("updated settings not returned");
  return result as SettingsData;
}

// generic helpers

export function cleanISODate(isoDate: string | Date): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function dayFromDate(date: Date): DayOfWeek {
  const dayNum = date.getDay();
  const dayName: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayName[dayNum];
}
