import Prisma, { Meal, MealPlan } from '@prisma/client'
import { add, sub } from "date-fns";
import { DayOfWeek } from './suggest';

const prisma = new Prisma.PrismaClient()

export async function getAllMealPlans(): Promise<MealPlan[]> {
    return await prisma.mealPlan.findMany(
        {
            where: {},
            include: { dinner: true }
        }
    )
}

export async function getAllMeals(): Promise<Meal[]> {
    return await prisma.meal.findMany(
        { include: { ingredients: true } })
}

export async function findMealByID(id: number): Promise<Meal | undefined> {
    if (id === null || id === undefined) throw Error('no id defined')
    const data = await prisma.meal.findFirst({
        where: {
            id: Number(id)
        },
        include: { ingredients: true }
    })
    if (data === null) return undefined
    return data
}

export async function getPreviousDayPlan(input: string): Promise<MealPlan> {
    const today = new Date(input)
    const yesterday = sub(today, { days: 1 }).toISOString()
    // console.log(`yesterday = ${yesterday}`)
    return prisma.mealPlan.findFirstOrThrow({
        where: {
            date: yesterday
        },
        include: { dinner: true }
    })
}

export async function getFutureDayPlan(input: string, n: number): Promise<MealPlan | undefined> {
    const today = new Date(input)
    const futureDate = add(today, { days: n }).toISOString()
    const nextMealPlan = await prisma.mealPlan.findFirstOrThrow({
        where: {
            date: futureDate
        },
        include: { dinner: true }
    })
    if (nextMealPlan !== undefined) return undefined
    else return nextMealPlan
}

export async function newPlanWithDinner(date: string, day: string, dinner: Meal) {
    const result = await prisma.mealPlan.create({
        data: {
            date,
            day,
            dinner: {
                connect: {
                    mealName: dinner.mealName
                }

            }
        }
    })
    return result
}

export async function newWeek(entryPoint: Date) {
    const newDates = []
    for (let index = 1; index < 7; index++) {
        const newDate = add(entryPoint, { days: index })
        newDates.push({ date: newDate.toISOString(), day: dayFromDate(newDate) })
    }
    const results: MealPlan[] = []
    newDates.forEach(async (plan) => {
        const result = await prisma.mealPlan.create({
            data: {
                date: plan.date,
                day: plan.day
            }
        })
        results.push(result)
    })
    return results
}

// helpers for the helpers

function dayFromDate(date: Date): DayOfWeek {
    const dayNum = date.getDay()
    const dayName: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayName[dayNum]
}