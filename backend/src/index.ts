import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {userRouter} from "./routes/user";
import {blogRouter} from "./routes/blog";
import {cors} from "hono/cors"
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}
const app = new Hono<{ Bindings: Bindings }>() // type of data
app.use("/*", cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)

export default app


// To begin with, our backend will have 4 routes
// auth_router
// POST /api/v1/user/signup
// POST /api/v1/user/signin

// blog_router
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk