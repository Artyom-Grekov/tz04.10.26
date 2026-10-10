import type { Post, CreatePostInput } from "./entity.js";

export interface Repository {
    getAll(category?: string, take?: number): Promise<Post[]>;
    getById(id: number): Promise<Post | undefined>;
    addPost(data: CreatePostInput): Promise<Post>;
}