
import { Request, Response } from 'express';

import CommentService from '../services/comment.service';
import { CreateCommentDTO, UpdateCommentDTO } from '../dtos/comment.dto';
import {
    CODE_CREATED,
    CODE_ERR,
    CODE_ERR_NOT_FOUND,
    CODE_NO_CONTENT,
    CODE_SUCCESS,
    MESSAGE_CREATED,
    MESSAGE_DELETED,
    MESSAGE_ERR,
    MESSAGE_ERR_CREATE,
    MESSAGE_ERR_NOT_FOUND,
    MESSAGE_ERR_UPDATE,
    MESSAGE_SUCCESS,
    MESSAGE_UPDATED,
} from '../utils/constants.util';
import {
    CreateCommentMapper,
    UpdateCommentMapper,
} from '../mapper/comment.mapper';

class CommentController {
    private readonly commentService: CommentService;
    private readonly updateCommentMapper: UpdateCommentMapper;
    private readonly createCommentMapper: CreateCommentMapper;
    constructor() {
        this.commentService = new CommentService();
        this.updateCommentMapper = new UpdateCommentMapper();
        this.createCommentMapper = new CreateCommentMapper();
    }

    async listComment(req: Request, res: Response) {
        const searchTerm = req.query.searchTerm as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.commentService.getTotalRecords();
            const comments = await this.commentService.getAllComments(
                { searchTerm },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: comments,
                totalRecords: totalRecords,
            };
            return res.status(200).json(response);
        } catch (error: any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async getCommentById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const comment = await this.commentService.getCommentById(id);
            if (!comment) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Comment not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: comment,
            };
            return res.status(200).json(response);
        } catch (error: any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async createComment(req: Request, res: Response) {
        const { content, postId, userId } = req.body;
        const createCommentDTO: CreateCommentDTO = {
            content,
            postId,
            userId,
        };
        const comment = this.createCommentMapper.toModel(createCommentDTO);

        try {
            const createdComment = await this.commentService.createComment(comment);
            if (!createdComment) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Comment creation failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdComment,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateComment(req: Request, res: Response) {
        const id = req.params.id;
        const { content } = req.body;
        const updateCommentDTO: UpdateCommentDTO = {
            content,
        };
        const comment = this.updateCommentMapper.toModel(updateCommentDTO);

        try {
            const updatedComment = await this.commentService.updateComment(
                parseInt(id),
                comment,
            );
            if (!updatedComment) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Comment update failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedComment,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteComment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedComment = await this.commentService.deleteComment(id);
            if (!deletedComment) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Comment not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Comment deleted successfully',
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
}

export default new CommentController();
