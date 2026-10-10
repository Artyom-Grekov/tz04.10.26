import type { Repository } from "../../domain/post/repository.js";
import type { CreatePostInput, Post } from "../../domain/post/entity.js";
import type { PostService } from "./types.js";

export function createPostService(
    repository: Repository
): PostService {
    return {
        async getPosts(category?: string, take?: number): Promise<Post[]> {
            return repository.getAll(category, take);
        },

        async getPostById(id: number): Promise<Post | undefined> {
            return repository.getById(id);
        },

        async createPost(data: CreatePostInput): Promise<Post> {
            return repository.addPost(data);
        }
    };
}