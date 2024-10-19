/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-14 01:55:52
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-16 23:09:59
 * @ Description: user route
 */

import BaseRoutes from './base/base.routes';
import UserController from '../controllers/user.controller';
import { adminMiddleware } from '../middlewares/auth.middleware';
class UserRoutes extends BaseRoutes {
    routes(): void {
        this.router.get(
            '/',
            // admin Middleware
            UserController.getAllUsers.bind(UserController),
        );
        this.router.get(
            '/:id',
            // user Middleware Middleware kiểm tra quyền truy cập thông tin cá nhân
            UserController.getUserById.bind(UserController),
        );

        this.router.put(
            '/:id',
            // adminMiddleware,
            // user Middleware Middleware kiểm tra quyền truy cập thông tin cá nhân
            UserController.updateUser.bind(UserController),
        );

        this.router.delete(
            '/:id',
            // adminMiddleware,
            // user Middleware Middleware kiểm tra quyền truy cập thông tin cá nhân
            UserController.deleteUser.bind(UserController),
        );
    }
}

export default new UserRoutes().router;
