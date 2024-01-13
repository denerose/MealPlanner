import { Meal } from "./types";

const SOURCE = 'http://localhost:3200'
const LOG = (msg: any) => { console.log(msg) }

// Meal options/list - function to get and send meal options to/from server
export async function postNewMealToServer(newMeal: Meal): Promise<Meal> {
    try {const response = await fetch(`${SOURCE}/meal/new`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMeal),
        })
    const result = await response.json() as Meal
    LOG(`New meal: ${result}`)
    return result }
    catch (error) {
        LOG(error)
    }
}

export async function getMealsFromServer(): Promise<Meal[]> {
    const response = await fetch(`${SOURCE}/meal/all`)
    const data = await response.json()
    LOG(`All meals: ${data}`)
    return data as Meal[]
}

export async function getMealByIdFromServer(mealID: number): Promise<Meal> {
    const response = await fetch(`${SOURCE}/meal/${String(mealID)}`)
    const data = await response.json() as Meal
    LOG(`Retrieved: ${data}`)
    return data
}

export async function postUpdateMealToServer(updatedMeal: Meal): Promise<Meal> {
    if (!updatedMeal.id) throw Error("no meal id")
    const response = await fetch(`${SOURCE}/meal/update/${updatedMeal.id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMeal),
        })
    const data = await response.json() as Meal
    LOG(`Updated meal: ${data}`)
    return data
}

export async function deleteMealFromServer(idToDelete: number): Promise<void> {
    const response = await fetch(`${SOURCE}/meal/delete/${String(idToDelete)}`,
        { method: "DELETE" })
    LOG(`Deleted: ${response.json()}`)
}



// Meal plans - functions to fetch and send meal plan associations to/from server
export async function getMealPlanFromServer() {

}