import Prisma, { Meal, MealPlan } from '@prisma/client'

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

export async function getYesterdayPlan(input: VarDate): Promise<MealPlan> {
    const today = new Date(input)
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate() - 1).padStart(2, '0')
    const yesterday = new Date(`${year}-${month}-${day}`).toISOString()
    console.log(`yesterday = ${yesterday}`)
    return prisma.mealPlan.findFirstOrThrow({
        where: {
            date: yesterday
        },
        include: { dinner: true }
    })
}