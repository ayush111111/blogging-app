import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@aaylmao/blogging-commons";
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

type Variables = {
    userId: string
}

export const blogRouter = new Hono<{ Bindings: Bindings, Variables:Variables }>();

//middleware
blogRouter.use("/*",async (c,next) =>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET, 'HS256')

    if(user){
        c.set("userId", user.id as string);
        await next();
    }else{
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});


blogRouter.post('/',async (c)=>{
    const body = await c.req.json();

    const result = createBlogInput.safeParse(body);
    if(!result.success){
    c.status(411)
    return c.json({
        message:"Input not correct"
    })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
    }).$extends(withAccelerate()) // extend with accelerate fo

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.put('/',async (c)=>{
    const body = await c.req.json();
    const result = updateBlogInput.safeParse(body);
    if(!result.success){
    c.status(411)
    return c.json({
        message:"Input not correct"
    })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
    }).$extends(withAccelerate()) // extend with accelerate fo

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id:blog.id
    })
})
blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
    }).$extends(withAccelerate()) // extend with accelerate fo

    try{
        const blogs = await prisma.post.findMany({
            select : {
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blogs
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error"
        })
    }
    // todo add pagination
})


blogRouter.get('/:id',async (c)=>{
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
    }).$extends(withAccelerate()) // extend with accelerate fo

    try{
    const blog = await prisma.post.findFirst({
        where: {
            id: id
        },
        select:{
            id:id,
            title: true,
            content: true,
            author: {
                select: {name:true}
            }
        }
    })
    return c.json({
        blog
    })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error"
        })
    }


})

