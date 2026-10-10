import type {
    Post,
    CreatePostInput
} from "../../domain/post/entity.js";

export interface PostService {
    getPosts(category?: string, take?: number): Promise<Post[]>;
    getPostById(id: number): Promise<Post | undefined>;
    createPost(data: CreatePostInput): Promise<Post>;
}