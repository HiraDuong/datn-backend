import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (jwtPayload: JwtPayload) => {
    return jwt.sign(jwtPayload, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '1m',
    });
};

export const verifyToken = (token: string) => {
    console.log('token', token);
    return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
};
