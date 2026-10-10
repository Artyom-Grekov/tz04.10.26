import express from "express";
import type { Request, Response } from "express";
import type {
    GetPostsQueryDto,
    GetPostParamsDto,
    CreatePostDto
} from "../dto/post.js";

type PostHandlers = {
    getPosts: (
        req: Request<{}, {}, {}, GetPostsQueryDto>,
        res: Response
    ) => Promise<void>;

    getPostById: (
        req: Request<GetPostParamsDto>,
        res: Response
    ) => Promise<void>;

    createPost: (
        req: Request<{}, {}, CreatePostDto>,
        res: Response
    ) => Promise<void>;
};

export function createPostRouter(handlers: PostHandlers) {
    const router = express.Router();

    router.get("/", handlers.getPosts);
    router.get("/:id", handlers.getPostById);
    router.post("/", handlers.createPost);

    return router;
}