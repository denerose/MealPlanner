import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import Prisma, { Ingredient, Meal } from '@prisma/client'
import * as bodyParser from 'milliparsec'

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
        await prisma.meal.findMany(
            { include: { ingredients: true } }))
})

app.post(`/meal/new`, async (req, res) => {
    const { mealName, description, ingredients } = req.body
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
            }
        },
    })
    console.log(`New meal: ${result}`)
    res.json(result)
})

app.post(`/meal/update/:id`, async (req, res) => {
    const { mealName, description, ingredients } = req.body
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
            }
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
        await prisma.meal.findFirst({
            where: {
                id: Number(req.params)
            },
            include: { ingredients: true }
        })
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

app.get('/plan/all', async (_, res) => {
    res.json(
        await prisma.mealPlan.findMany(
            {
                where: {},
                include: { dinner: true }
            }
        ))
})

app.post(`/plan/new`, async (req, res) => {
    const { date, day, dinner } = req.body
    const isoDate = new Date(date).toISOString()
    const result = await prisma.mealPlan.create({
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
    res.json(result)
})

app.post(`/plan/update/:id`, async (req, res) => {
    const { date, day, dinner } = req.body
    const isoDate = new Date(date).toISOString()
    const result = await prisma.mealPlan.update({
        where: { id: Number(req.params.id) },
        data: {
            date: isoDate,
            day,
            dinner: {
                connect: {
                    mealName: dinner
                },
            },
        },
        include: { dinner: true }
    })
    res.json(result)
})

// always last

app.listen(3200, () => console.log('Server ready at: http://localhost:3200'))