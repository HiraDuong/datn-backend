/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 10:37:39
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 01:27:17
 * @ Description: auth service
 */

import { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import { generateSalt, hashPasswordWithSalt } from '../utils/bycrypt.util';
import {
    CODE_CREATED,
    CODE_ERR_NOT_FOUND,
    CODE_SUCCESS,
    MESSAGE_ERR_EMAIL_EXISTED,
    MESSAGE_ERR_EMAIL_NOT_FOUND,
    MESSAGE_ERR_WRONG_EMAIL_PASSWORD,
    MESSAGE_LOGIN_SUCCESS,
    MESSAGE_REGISTER_SUCCESS,
    MESSAGE_SUCCESS,
    UserRole,
} from '../utils/constants.util';
import { generateToken } from '../utils/jwt.util';

class AuthService {
    // inject repository
    private readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async login(email: string, password: string) {
        // find email if exists in database
        const account = await this.userRepository.getByEmail(email);
        if (account) {
            // get salt from database
            const salt = account.salt;
            // generate hashed password
            const hashedPassword = await hashPasswordWithSalt(password, salt);
            // compare hashed password with stored hashed password
            if (hashedPassword === account.password) {
                // generate token
                const payload: JwtPayload = {
                    id: account.id,
                    username: account.username,
                    email: account.email,
                    avatar: account.avatar,
                    role: account.role,
                };
                const token = generateToken(payload);
                return Promise.resolve({
                    code: CODE_SUCCESS,
                    message: MESSAGE_LOGIN_SUCCESS,
                    data: token,
                });
            } else {
                return Promise.resolve({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_WRONG_EMAIL_PASSWORD,
                    data: '',
                });
            }
        } else {
            return Promise.resolve({
                code: CODE_ERR_NOT_FOUND,
                message: MESSAGE_ERR_EMAIL_NOT_FOUND,
                data: '',
            });
        }
    }

    async register(email: string, username: string, password: string) {
        // check if email exists
        const account = await this.userRepository.getByEmail(email);
        console.log('get by email', account);
        if (account) {
            return Promise.resolve({
                code: CODE_ERR_NOT_FOUND,
                message: MESSAGE_ERR_EMAIL_EXISTED,
                data: '',
            });
        }
        // generate salt
        const salt = await generateSalt();
        // generate hashed password
        const hashedPassword = await hashPasswordWithSalt(password, salt);
        // create new user
        try {
            const newUser = await this.userRepository.create({
                id: -1,
                username,
                email,
                password: hashedPassword,
                salt,
                avatar: '',
                role: UserRole.User,
            });
            return Promise.resolve({
                code: CODE_CREATED,
                message: MESSAGE_REGISTER_SUCCESS,
                data: newUser.username,
            });
        } catch (error) {
            return Promise.reject(Error('Failed to create user: ' + error));
        }
    }
}

export default AuthService;
