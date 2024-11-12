
import { CommentModel, CommentSearchTerm } from '../types/comment.type';
import Comment from '../models/postgresql/comment.model';
import { Op } from 'sequelize';

interface ICommentRepository {
    create(comment: CommentModel): Promise<Comment>;
    getAll(searchTerm: CommentSearchTerm, limit: number, offset: number): Promise<Comment[]>;
    getById(id: number): Promise<Comment | null>;
    update(id: number, comment: Partial<CommentModel>): Promise<Comment | null>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class CommentRepository implements ICommentRepository {
    async getTotalRecords(): Promise<number> {
        return await Comment.count();
    }

    async create(comment: CommentModel): Promise<Comment> {
        try {
            return await Comment.create({
                postId: comment.postId,
                userId: comment.userId,
                content: comment.content,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            });
        } catch (error) {
            throw new Error('Failed to create comment: ' + error);
        }
    }

    async getAll(searchTerm: CommentSearchTerm, limit: number = 10, offset: number = 0): Promise<Comment[]> {
        try {
            const where: any = {};
            if (searchTerm.content) {
                where.content = { [Op.iLike]: `%${searchTerm.content}%` };
            }
            const conditions: any = { where };
            if (limit) conditions.limit = limit;
            if (offset) conditions.offset = offset;
            return await Comment.findAll(conditions);
        } catch (error) {
            throw new Error('Failed to get comments: ' + error);
        }
    }

    async getById(id: number): Promise<Comment | null> {
        try {
            return await Comment.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get comment: ' + error);
        }
    }

    async update(id: number, comment: Partial<CommentModel>): Promise<Comment | null> {
        try {
            const existingComment = await Comment.findByPk(id);
            if (!existingComment) throw new Error('Comment not found');
            await existingComment.update(comment);
            return existingComment;
        } catch (error) {
            throw new Error('Failed to update comment: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingComment = await Comment.findByPk(id);
            if (!existingComment) throw new Error('Comment not found');
            await existingComment.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete comment: ' + error);
        }
    }
}

export default CommentRepository;
