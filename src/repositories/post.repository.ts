
import { PostModel, PostSearchTerm } from '../types/post.type';
import Post from '../models/postgresql/post.model';
import { Op } from 'sequelize';

interface IPostRepository {
    create(post: PostModel): Promise<Post>;
    getAll(searchTerm: PostSearchTerm, limit: number, offset: number): Promise<Post[]>;
    getById(id: number): Promise<Post | null>;
    update(id: number, post: Partial<PostModel>): Promise<Post | null>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class PostRepository implements IPostRepository {
    async getTotalRecords(): Promise<number> {
        return await Post.count();
    }

    async create(post: PostModel): Promise<Post> {
        try {
            return await Post.create({
                userId: post.userId,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            });
        } catch (error) {
            throw new Error('Failed to create post: ' + error);
        }
    }

    async getAll(searchTerm: PostSearchTerm, limit: number = 10, offset: number = 0): Promise<Post[]> {
        try {
            const where: any = {};
            if (searchTerm.content) {
                where.content = { [Op.iLike]: `%${searchTerm.content}%` };
            }
            const conditions: any = { where };
            if (limit) conditions.limit = limit;
            if (offset) conditions.offset = offset;
            return await Post.findAll(conditions);
        } catch (error) {
            throw new Error('Failed to get posts: ' + error);
        }
    }

    async getById(id: number): Promise<Post | null> {
        try {
            return await Post.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get post: ' + error);
        }
    }

    async update(id: number, post: Partial<PostModel>): Promise<Post | null> {
        try {
            const existingPost = await Post.findByPk(id);
            if (!existingPost) throw new Error('Post not found');
            await existingPost.update(post);
            return existingPost;
        } catch (error) {
            throw new Error('Failed to update post: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingPost = await Post.findByPk(id);
            if (!existingPost) throw new Error('Post not found');
            await existingPost.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete post: ' + error);
        }
    }
}

export default PostRepository;
