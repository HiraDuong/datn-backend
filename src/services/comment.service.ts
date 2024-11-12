import { CommentModel, CommentSearchTerm } from '../types/comment.type';
import {  CommentByIdMapper } from '../mapper/comment.mapper';
import Comment from '../models/postgresql/comment.model';
import CommentRepository from '../repositories/comment.repostiory';
import { CommentDTO } from '../dtos/comment.dto';

class CommentService {
    private readonly commentRepository: CommentRepository;
    private readonly commentByIdMapper: CommentByIdMapper;

    constructor() {
        this.commentRepository = new CommentRepository();
        this.commentByIdMapper = new CommentByIdMapper();
    }

    // create a new comment
    async createComment(comment: CommentModel): Promise<Comment> {
        try {
            return await this.commentRepository.create(comment);
        } catch (error) {
            throw new Error(error + 'Failed to create comment');
        }
    }

    // list comments
    async getAllComments(searchTerm: CommentSearchTerm, limit: number = 10, offset: number = 0): Promise<CommentDTO[]> {
        try {
            const comments = await this.commentRepository.getAll(searchTerm, limit, offset);
            return comments.map((comment) => this.commentByIdMapper.toDTO(comment));
        } catch (error) {
            throw new Error(error + 'Failed to get comments');
        }
    }

    // get comment by id
    async getCommentById(id: number): Promise<CommentDTO | null> {
        try {
            const comment = await this.commentRepository.getById(id);
            if (comment) {
                return this.commentByIdMapper.toDTO(comment);
            } else {
                throw new Error('Comment not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to get comment by id');
        }
    }

    // update comment by id
    async updateComment(id: number, comment: Partial<CommentModel>): Promise<CommentDTO | null> {
        try {
            const updatedComment = await this.commentRepository.update(id, comment);
            if (updatedComment) {
                return this.commentByIdMapper.toDTO(updatedComment);
            } else {
                throw new Error('Comment not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update comment by id');
        }
    }

    // delete comment by id
    async deleteComment(id: number): Promise<boolean> {
        try {
            const deletedComment = await this.commentRepository.delete(id);
            return deletedComment;
        } catch (error) {
            throw new Error(error + 'Failed to delete comment by id');
        }
    }

    // get total records
    async getTotalRecords(): Promise<number> {
        return await this.commentRepository.getTotalRecords();
    }
}

export default CommentService;
