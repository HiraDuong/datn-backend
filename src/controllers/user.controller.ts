/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:15:15
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-16 23:14:03
 * @ Description: user controller
 */

import { Request, Response } from 'express';
import { UserListDTO, UserUpdatedDTO } from '../dtos/user.dto';
import {
    CODE_ERR,
    CODE_SUCCESS,
    MESSAGE_DELETED,
    MESSAGE_ERR,
    MESSAGE_ERR_DELETE,
    MESSAGE_ERR_UPDATE,
    MESSAGE_SUCCESS,
    MESSAGE_UPDATED,
} from '../utils/constants.util';
import UserService from '../services/user.service';

import { UserListMapper, UserUpdatedMapper } from '../mapper/user.mapper';
import { BEResponse } from '../types/response.type';

class UserController {
    // inject UserService
    private userService: UserService;
    // inject UserMapper
    private userUpdatedMapper: UserUpdatedMapper;
    constructor() {
        this.userService = new UserService();
        this.userUpdatedMapper = new UserUpdatedMapper();
    }
    // get all users
    async getAllUsers(req: Request, res: Response) {
        // Lấy các tham số từ query string
        const username = req.query.username as string;
        const email = req.query.email as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const users = await this.userService.getUsers(
                { username, email },
                limit,
                offset,
            );
            const response: BEResponse<UserListDTO[]> = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: users,
            };
            return res.status(200).json(response);
        } catch (error: Error | any) {
            const response: BEResponse<string> = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(500).json(response);
        }
    }

    // get user by userId
    async getUserById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const user = await this.userService.getUserById(parseInt(id));
            if (!user) {
                const response: BEResponse<string> = {
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'User not found',
                };
                return res.status(404).json(response);
            }
            const response: BEResponse<UserListDTO> = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: user,
            };
            return res.status(200).json(response);
        } catch (error: Error | any) {
            const response: BEResponse<string> = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(500).json(response);
        }
    }

    // create new user -- không cho phép ở đây ( chỉ cho phép tạo qua đăng ký)

    // update user info by userId -- chỉ cho phép update quyền admin và user tương ứng
    async updateUser(req: Request, res: Response) {
        const id = req.params.id;
        const userUpdatedDTO = req.body;
        // map dto to entity
        const userUpdated = this.userUpdatedMapper.toEntity(
            parseInt(id),
            userUpdatedDTO,
        );
        try {
            const updatedUser = await this.userService.updateUser(
                parseInt(id),
                userUpdated,
            );
            if (!updatedUser) {
                const response: BEResponse<string> = {
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'User not found',
                };
                return res.status(404).json(response);
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedUser,
            });
        } catch (error: Error | any) {
            const response: BEResponse<string> = {
                code: CODE_ERR,
                message: MESSAGE_ERR_UPDATE,
                data: error.message,
            };
            return res.status(500).json(response);
        }
    }
    // delete user by userId -- chỉ cho phép xóa quyền admin và user tương ứng
    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const deletedUser = await this.userService.deleteUser(parseInt(id));
            if (!deletedUser) {
                const response: BEResponse<string> = {
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'User not found',
                };
                return res.status(404).json(response);
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_DELETED,
                data: deletedUser,
            });
        } catch (error: Error | any) {
            const response: BEResponse<string> = {
                code: CODE_ERR,
                message: MESSAGE_ERR_DELETE,
                data: error.message,
            };
            return res.status(500).json(response);
        }
    }
}
export default new UserController();
