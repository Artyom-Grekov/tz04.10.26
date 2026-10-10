import type {
    Post,
    CreatePostInput
} from "../domain/post/entity.js";

import type { Repository } from "../domain/post/repository.js";

type PostQuery = {
    where(filters: Partial<Post>): PostQuery;
    limit(count: number): PostQuery;
    all(): Promise<Post[]>;
    first(): Promise<Post | null>;
    create(data: CreatePostInput): Promise<Post>;
};

type Db = {
    orm: {
        public: {
            Post: PostQuery;
        };
    };
};

export function createPostRepository(db: Db): Repository {
    return {
        async getAll(category?: string, take?: number): Promise<Post[]> {
            let query = category
                ? db.orm.public.Post.where({ category })
                : db.orm.public.Post;

            if (take !== undefined) {
                query = query.limit(take);
            }

            return await query.all();
        },

        async getById(id: number): Promise<Post | undefined> {
            const post = await db.orm.public.Post
                .where({ id })
                .first();

            return post ?? undefined;
        },

        async addPost(data: CreatePostInput): Promise<Post> {
            return await db.orm.public.Post.create({
                title: data.title,
                content: data.content,
                author: data.author,
                category: data.category
            });
        }
    };
}