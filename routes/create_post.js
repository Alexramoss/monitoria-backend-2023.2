import { Router } from "express";
import { prisma } from "../prisma.js";

export const create_postRouter = Router();

create_postRouter.get("/", async(res) => {
    const posts = await prisma.post.findMany();
    res.send(posts);
});

create_postRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
    });
    res.send(post);
});

create_postRouter.post("", async (req, res) => {
    const post = await req.body;
  
    const newpost = await prisma.post.create({
      data: {
        description: post.description,
        filename: post.filename,
        authorID: post.authorID,
      },
    });
  
    res.send(newpost);
});
