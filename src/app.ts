import express from "express";
import { db } from "./prisma/db.js";
import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post/index.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

export function createApp() {
    const app = express();

    app.use(express.json());

    const repository = createPostRepository(db);
    const service = createPostService(repository);
    const handlers = createPostHandlers(service);
    const router = createPostRouter(handlers);

    app.use("/posts", router);

    return app;
}