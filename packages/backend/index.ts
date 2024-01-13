import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import Prisma from '@prisma/client'
import * as bodyParser from 'milliparsec'

const prisma = new Prisma.PrismaClient()
const app = new App().use(cors({ origin: '*' })).options('*', cors()).use(bodyParser.json())

app.use(bodyParser.json())

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

// Meals CRUD
app.get('/meal/all', async (req, res) => {
    res.json(
        await prisma.meal.findMany(
            { include: { ingredients: true } }))
})

app.post(`/meal/new`, async (req, res) => {
    const { mealName, description } = req.body
    const result = await prisma.meal.create({
        data: {
            mealName,
            description,
        }
    })
    res.json(result)
})

app.post(`/meal/update/:id`, async (req, res) => {
    const updatedData = req.body as Meal
    const result = await prisma.meal.update({
        where: { id: Number(req.params.id) },
        data: {
            mealName: updatedData.mealName,
            description: updatedData.description,
        },
        include: {ingredients: true}
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
app.get('/filtermeals', async (req, res) => {
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

app.listen(3200, () => console.log('Server ready at: http://localhost:3200'))