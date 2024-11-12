/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 00:46:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 17:15:10
 * @ Description: Post Controller
 */
import { Request, Response } from 'express';

import PostService from '../services/post.service';
import { CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
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
    CreatePostMapper,
    UpdatePostMapper,
} from '../mapper/post.mapper';

class PostController {
    private readonly postService: PostService;
    private readonly updatePostMapper: UpdatePostMapper;
    private readonly createPostMapper: CreatePostMapper;
    constructor() {
        this.postService = new PostService();
        this.updatePostMapper = new UpdatePostMapper();
        this.createPostMapper = new CreatePostMapper();
    }

    async listPosts(req: Request, res: Response) {
        const searchTerm = req.query.searchTerm as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.postService.getTotalRecords();
            const posts = await this.postService.getAllPosts(
                { searchTerm },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: posts,
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

    async getPostById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const post = await this.postService.getPostById(id);
            if (!post) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Post not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: post,
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

    async createPost(req: Request, res: Response) {
        const { content, userId } = req.body;
        const createPostDTO: CreatePostDTO = {
            content,
            userId,
        };
        const post = this.createPostMapper.toModel(createPostDTO);

        try {
            const createdPost = await this.postService.createPost(post);
            if (!createdPost) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Post creation failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdPost,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updatePost(req: Request, res: Response) {
        const id = req.params.id;
        const { content } = req.body;
        const updatePostDTO: UpdatePostDTO = {
            content,
        };
        const post = this.updatePostMapper.toModel(updatePostDTO);

        try {
            const updatedPost = await this.postService.updatePost(parseInt(id), post);
            if (!updatedPost) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Post update failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedPost,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deletePost(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedPost = await this.postService.deletePost(id);
            if (!deletedPost) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Post not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Post deleted successfully',
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

export default new PostController();
