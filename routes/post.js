import { Router } from "express";
import { prisma } from "../prisma.js";

export const postRouter = Router();

postRouter.post("", async(req, res) => {
    const post = await req.body;
    const filename = req.file.filename;
    const newPost = await prisma.post.create({
        data: {
            description: post.description,
            filename: filename.filename,
            authorId: post.authorId,
    }});
    res.send(newPost)
});

postRouter.get("/", async (req, res) => {
    const posts = await prisma.post.findMany();
    res.send(posts);
  });

postRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    })

if (!post) {
    return res.stuatus(400).send("Image Invalid or not found")
} else {
    return res.send(post)
}
});
