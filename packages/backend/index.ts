import { App } from '@tinyhttp/app'
import Prisma from '@prisma/client'
import * as bodyParser from 'milliparsec'

const prisma = new Prisma.PrismaClient()
const app = new App()

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
app.get('/allmeals', async (req, res) => {
    res.json(
        await prisma.meal.findMany())
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
app.delete(`/meal/:id`, async (req, res) => {
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
            }
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
            }
        })
    )
})

app.listen(3200, () => console.log('Server ready at: http://localhost:3200'))