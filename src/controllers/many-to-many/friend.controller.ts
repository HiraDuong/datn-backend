/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 00:46:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 17:13:11
 * @ Description: Friend Controller
 */
import { Request, Response } from 'express';

import FriendService from '../services/friend.service';
import { CreateFriendDTO, UpdateFriendDTO } from '../dtos/friend.dto';
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
} from '../../utils/constants.util';
import {
    CreateFriendMapper,
    UpdateFriendMapper,
} from '../mapper/friend.mapper';

class FriendController {
    private readonly friendService: FriendService;
    private readonly updateFriendMapper: UpdateFriendMapper;
    private readonly createFriendMapper: CreateFriendMapper;
    constructor() {
        this.friendService = new FriendService();
        this.updateFriendMapper = new UpdateFriendMapper();
        this.createFriendMapper = new CreateFriendMapper();
    }

    async listFriends(req: Request, res: Response) {
        const searchTerm = req.query.searchTerm as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.friendService.getTotalRecords();
            const friends = await this.friendService.getAllFriends(
                { searchTerm },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: friends,
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

    async getFriendById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const friend = await this.friendService.getFriendById(id);
            if (!friend) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Friend not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: friend,
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

    async createFriend(req: Request, res: Response) {
        const { userId, friendId } = req.body;
        const createFriendDTO: CreateFriendDTO = {
            userId,
            friendId,
        };
        const friend = this.createFriendMapper.toModel(createFriendDTO);

        try {
            const createdFriend = await this.friendService.createFriend(friend);
            if (!createdFriend) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Friend creation failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdFriend,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateFriend(req: Request, res: Response) {
        const id = req.params.id;
        const { userId, friendId } = req.body;
        const updateFriendDTO: UpdateFriendDTO = {
            userId,
            friendId,
        };
        const friend = this.updateFriendMapper.toModel(updateFriendDTO);

        try {
            const updatedFriend = await this.friendService.updateFriend(
                parseInt(id),
                friend,
            );
            if (!updatedFriend) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Friend update failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedFriend,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteFriend(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedFriend = await this.friendService.deleteFriend(id);
            if (!deletedFriend) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Friend not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Friend deleted successfully',
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

export default new FriendController();
