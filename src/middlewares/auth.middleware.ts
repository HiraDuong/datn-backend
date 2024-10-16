/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:10:15
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-15 00:08:51
 * @ Description: middleware xác thực
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { JwtPayload } from 'jsonwebtoken';

// Middleware kiểm tra đăng nhập
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Not authorized' });
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;

        (req as any).id = (decoded as any).id; // Lưu userId vào request
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

// Middleware kiểm tra quyền user
export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Gọi middleware authMiddleware trước
    authMiddleware(req, res, () => {
        const userRole = (req as any).role; // Lấy role từ request

        if (userRole !== 'user') {
            return res
                .status(403)
                .send({ error: 'Access denied. User role required.' });
        }

        next();
    });
};

// Middleware kiểm tra quyền admin
export const adminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Gọi middleware authMiddleware trước
    authMiddleware(req, res, () => {
        const userRole = (req as any).role; // Lấy role từ request

        if (userRole !== 'admin') {
            return res
                .status(403)
                .send({ error: 'Access denied. Admin role required.' });
        }

        next();
    });
};
// Middleware kiểm tra quyền truy cập thông tin cá nhân
export const selfUpdateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params; // Lấy userId từ params hoặc body
    const authenticatedUserId = (req as any).id; // Lấy userId từ decoded token

    if (id !== authenticatedUserId) {
        return res
            .status(403)
            .send({
                error: 'Access denied. You can only update your own information.',
            });
    }

    next();
};
