import { Router } from "express";
import { prisma } from "../prisma.js";

export const read_postRouter = Router();

read_postRouter.post("/post", async(req, res) => {
    const {id} = req.body;
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if (!post) {
        return res.status(400).send("Post not found");
    } else {
        return res.send({message: "Post found"})
        }
    });

