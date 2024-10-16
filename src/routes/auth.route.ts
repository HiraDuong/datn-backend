/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 11:55:16
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-14 01:58:07
 * @ Description: auth routes
 */

import BaseRoutes from './base/base.routes';
import AuthController from '../controllers/auth.controller';
class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post('/login', AuthController.login.bind(AuthController));
        this.router.post(
            '/register',
            AuthController.register.bind(AuthController),
        );
        // test route
        this.router.get('/', (req, res) => {
            return res.status(200).json({
                message: 'Hello Auth',
            });
        });
    }
}

export default new AuthRoutes().router;
