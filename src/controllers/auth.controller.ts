/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 11:56:23
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-24 03:23:20
 * @ Description: auth controller
 */
// auth.controller.ts
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import {
    CODE_ERR,
    MESSAGE_LOGIN_FAILED,
    MESSAGE_REGISTER_FAILED,
} from '../utils/constants.util';

class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const result = await this.authService.login(email, password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_LOGIN_FAILED,
                data: '',
            });
        }
    }

    async register(req: Request, res: Response) {
        const { email, username, password } = req.body;
        console.log('data', req.body);
        console.log('email', email);
        console.log('username', username);
        console.log('password', password);

        try {
            console.log('start register');
            const result = await this.authService.register(
                email,
                username,
                password,
            );
            return res.status(201).json(result);
        } catch (error) {
            console.log('error', error);
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_REGISTER_FAILED,
                data: '',
            });
        }
    }
}

export default new AuthController();
