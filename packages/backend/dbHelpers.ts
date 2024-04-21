import Prisma, { Meal, MealPlan, Settings } from '@prisma/client'
import { add, eachDayOfInterval, formatISO, isMonday, nextMonday, nextSunday, previousMonday, setHours, sub } from "date-fns";
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

export async function newMealPlan(isoDate: string, day: string, dinner: { mealName: any; }): Promise<MealPlan | undefined> {
    return await prisma.mealPlan.create({
        data: {
            date: isoDate,
            day,
            dinner: {
                connect: {
                    mealName: dinner.mealName
                }

            }
        }
    })
}

export async function getPreviousDayPlan(input: string): Promise<MealPlan> {
    const today = new Date(input)
    const yesterday = sub(today, { days: 1 })
    // console.log(`yesterday = ${yesterday}`)
    return prisma.mealPlan.findFirstOrThrow({
        where: {
            date: dateForStorage(yesterday)
        },
        include: { dinner: true }
    })
}

export async function getFutureDayPlan(input: string, n: number): Promise<MealPlan | undefined> {
    const today = new Date(input)
    const futureDate = add(today, { days: n })
    const nextMealPlan = await prisma.mealPlan.findFirstOrThrow({
        where: {
            date: dateForStorage(futureDate)
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
        newDates.push({ date: dateForStorage(newDate), day: dayFromDate(newDate) })
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
// Settings

export async function updateSettings(newData: Settings): Promise<Settings | undefined> {
    const result = await prisma.settings.upsert({
        where: { preset: newData.preset },
        update: {
            lunchRule: newData.lunchRule,
            carbRule: newData.carbRule,
            acidRule: newData.acidRule
        },
        create: {
            preset: newData.preset,
            lunchRule: newData.lunchRule,
            carbRule: newData.carbRule,
            acidRule: newData.acidRule
        }
    })
    if (result === null) return undefined
    return result
}

export async function getSettings(settingsName: string): Promise<Settings | undefined> {
    const result = await prisma.settings.findFirst({
        where: { preset: settingsName }
    })
    if (result === null) return undefined
    return result
}



export async function getOrCreateCurrentWeek() {
    // returns server time, TODO: bring 'today' from client
    const today = cleanDate(new Date())
    console.log(today)
    const monday = isMonday(today) ? today : previousMonday(today)
    const sunday = nextSunday(monday)
    const currentWeekDates = eachDayOfInterval({ start: monday, end: sunday })
    const results: MealPlan[] = []
    for (const day of currentWeekDates) {
        const date = dateForStorage(day);
        const result = await prisma.mealPlan.findUnique({
            where: { date: date },
            include: { dinner: true }
        });
        if (result && result != null) {
            results.push(result);
        }
        else {
            const newPlan: MealPlan = await prisma.mealPlan.create({
                data: {
                    date,
                    day: dayFromDate(day)
                }
            });
            console.log(`new plan: ${newPlan}`);
            results.push(newPlan);
        }
    }
    // TODO add error checking here
    return results
}

export async function getNextWeek() {
    const today = cleanDate(new Date())
    const monday = nextMonday(today)
    const sunday = nextSunday(monday)
    const currentWeekDates = eachDayOfInterval({ start: monday, end: sunday })
    const results: MealPlan[] = []
    for (const day of currentWeekDates) {
        const date = dateForStorage(day);
        const result = await prisma.mealPlan.findUnique({
            where: { date: date },
            include: { dinner: true }
        });
        if (result && result != null) {
            results.push(result);
        }
    }
    return results
}

export async function getOrCreateNextWeek() {
    // returns server time, TODO: bring 'today' from client, TODO refactor to combined function with mon & sun as params
    const today = cleanDate(new Date())
    const monday = nextMonday(today)
    const sunday = nextSunday(monday)
    const currentWeekDates = eachDayOfInterval({ start: monday, end: sunday })
    const results: MealPlan[] = []
    for (const day of currentWeekDates) {
        const date = dateForStorage(day);
        const result = await prisma.mealPlan.findUnique({
            where: { date: date },
            include: { dinner: true }
        });
        if (result && result != null) {
            results.push(result);
        }
        else {
            const newPlan: MealPlan = await prisma.mealPlan.create({
                data: {
                    date,
                    day: dayFromDate(day)
                }
            });
            console.log(`new plan: ${newPlan}`);
            results.push(newPlan);
        }
    }
    // TODO add error checking here
    return results
}

// helpers for the helpers

function cleanDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function dateForStorage(dateInput: Date) {
    const cleanDate = formatISO(dateInput, { representation: "date" })
    return cleanDate
}

function dayFromDate(date: Date): DayOfWeek {
    const dayNum = date.getDay()
    const dayName: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayName[dayNum]
}