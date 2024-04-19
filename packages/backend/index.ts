import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import Prisma, { Ingredient, Meal, MealPlan, Settings } from '@prisma/client'
import * as bodyParser from 'milliparsec'
import { findMealByID, getAllMealPlans, getAllMeals, getNextWeek, getOrCreateCurrentWeek, getOrCreateNextWeek, getPreviousDayPlan, getSettings, newMealPlan, updateSettings } from './dbHelpers'
import { suggest } from './suggest'

const prisma = new Prisma.PrismaClient()
const app = new App().use(cors({ origin: '*' })).options('*', cors()).use(bodyParser.json())

app.post(`/user`, async (req, res) => {
    res.json(
        await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name
            }
        })
    )
})

// Ingredients CRUD

app.get('/ing/all', async (req, res) => {
    res.json(
        await prisma.ingredient.findMany())
})

app.delete(`/ing/delete/:id`, async (req, res) => {
    res.json(
        await prisma.ingredient.delete({
            where: {
                id: Number(req.params.id)
            }
        })
    )
})

app.post(`/meal/remove/:id`, async (req, res) => {
    const data = req.body
    const result = await prisma.meal.update({
        where: { id: Number(req.params.id) },
        data: {
            ingredients: {
                disconnect: { ingredientName: data.ingredientName }
            }
        }
    })
    res.json(result)
})

// Meals CRUD
app.get('/meal/all', async (req, res) => {
    res.json(
        await getAllMeals())
})

app.post(`/meal/new`, async (req, res) => {
    const { mealName, description, ingredients, qualities } = req.body
    const result = await prisma.meal.create({
        data: {
            mealName,
            description,
            ingredients: {
                connectOrCreate: ingredients.map((i: Ingredient) => {
                    return {
                        where: { ingredientName: i.ingredientName },
                        create: { ingredientName: i.ingredientName }
                    }
                })
            },
            isHighCarb: qualities.isHighCarb,
            isHighVeg: qualities.isHighVeg,
            makesLunch: qualities.makesLunch,
            isCreamy: qualities.isCreamy,
            isAcidic: qualities.isAcidic,
            outdoorCooking: qualities.outdoorCooking,
        },
    })
    console.log(`New meal: ${result}`)
    res.json(result)
})

app.post(`/meal/update/:id`, async (req, res) => {
    const { mealName, description, ingredients, qualities } = req.body
    const result = await prisma.meal.update({
        where: { id: Number(req.params.id) },
        data: {
            mealName: mealName,
            description: description,
            ingredients: {
                connectOrCreate: ingredients.map((i: Ingredient) => {
                    return {
                        where: { ingredientName: i.ingredientName },
                        create: { ingredientName: i.ingredientName }
                    };
                }),
            },
            isHighCarb: qualities.isHighCarb,
            isHighVeg: qualities.isHighVeg,
            makesLunch: qualities.makesLunch,
            isCreamy: qualities.isCreamy,
            isAcidic: qualities.isAcidic,
            outdoorCooking: qualities.outdoorCooking,
        },
        include: { ingredients: true }
    })
    res.json(result)
})

app.delete(`/meal/delete/:id`, async (req, res) => {
    res.json(
        await prisma.meal.delete({
            where: {
                id: Number(req.params.id)
            }
        })
    )
})
app.get(`/meal/:id`, async (req, res) => {
    res.json(
        await findMealByID(Number(req.params))
    )
})
app.get('/meal/filter', async (req, res) => {
    const { searchString } = req.query

    res.json(
        await prisma.meal.findMany({
            where: {
                OR: [
                    {
                        mealName: {
                            contains: searchString as string
                        }
                    },
                    {
                        description: {
                            contains: searchString as string
                        }
                    }
                ]
            },
            include: { ingredients: true }
        })
    )
})

// Meal Plans CRUD

//note: check with Kim if there is another/better way to do this

app.post('/plan/suggest', async (req, res) => {
    const request = req.body as MealPlan
    const previousPlan = await getPreviousDayPlan(String(request.date))
    if (previousPlan) {
        res.json(
            await suggest(previousPlan))
    }
    else res.json(await suggest())
})

app.get('/plan/all', async (_, res) => {
    res.json(
        await getAllMealPlans())
})

app.get('/plan/current', async (_, res) => {
    res.json(await getOrCreateCurrentWeek())
})

app.get('/plan/next', async (_, res) => {
    res.json(await getNextWeek())
})

app.get('/plan/newweek', async (_, res) => {
    res.json(await getOrCreateNextWeek())
})

app.post(`/plan/new`, async (req, res) => {
    const { date, day, dinner } = req.body
    const isoDate = new Date(date).toISOString()
    const result = newMealPlan(isoDate, day, dinner)
    res.json(result)
})

app.post(`/plan/update/:id`, async (req, res) => {
    const { date, day, dinner } = req.body
    const isoDate = new Date(date).toISOString()
    const result = await prisma.mealPlan.update({
        where: { id: Number(req.params.id) },
        data: {
            // date: isoDate,
            day,
            dinner: {
                connect: {
                    mealName: dinner.mealName
                },
            },
        },
        include: { dinner: true }
    })
    res.json(result)
})

app.get('/plan/yest', async (req, res) => {
    const { date } = req.query
    if (date !== typeof VarDate) throw Error('no original date supplied for yesterday check')
    res.json(
        await getPreviousDayPlan(String(date))
    )
})

// settings

app.post('/settings/update', async (req, res) => {
    const newData = req.body as Settings
    const result = await updateSettings(newData)
    res.json(result)
})

app.get('/settings/get', async (_, res) => {
    const result = await getSettings('default')
    res.json(result)
})


// always last

app.listen(3200, () => console.log('Server ready at: http://localhost:3200'))