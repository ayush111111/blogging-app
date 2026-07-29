
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@aaylmao/blogging-commons";
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}


export const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post('/signup', async (c) => {
  // connect to db
  const body = await c.req.json();
  const result = signupInput.safeParse(body);
  if(!result.success){
    c.status(411)
    return c.json({
        message:"Input not correct"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
  }).$extends(withAccelerate()) // extend with accelerate fo
  // add to db, if not present already
  try{
    const user = await prisma.user.create({
      data:{
        email: body.username,
        password: body.password,
        name: body.name
      }
    });

    const jwt = await sign(
      {id: user.id},
      c.env.JWT_SECRET
    )
    return c.json({jwt})
  } catch(e){
    // console.log(e);  
    return c.json({ error: 'User already exists' }, 411);
  }
  
  // after adding, use the email and the jwt to sign a token

})


userRouter.post('/signin', async (c) => {
    
    const body = await c.req.json();
    const result = signinInput.safeParse(body);
    if(!result.success){
        c.status(411)
        return c.json({
            message:"Input not correct"
        })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // each route , reinitialise prisma - global access to url is not there
  }).$extends(withAccelerate()) // extend with accelerate fo
  // add to db, if not present already
  try{
    const user = await prisma.user.findFirst({
      where:{
        email:body.username,
        password: body.password //hash
      }
    });
    if (!user){
      return c.status(403);    
    }
    const jwt = await sign(
      {id: user.id},
      c.env.JWT_SECRET
    )
    return c.json({jwt})
  } catch(e){
    // console.log(e);  
    return c.json({ error: 'User already exists' }, 403);
  }
})

