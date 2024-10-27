
import Users from '../models/postgresql/user.model';

import { Op } from 'sequelize';
import { UserModel, UserSearchTerm } from '../types/user.type';
import { UserRole } from '../utils/constants.util';

interface IUserRepository {
    create(user: Users): Promise<Users>;
    getAll(searchTerm: UserSearchTerm): Promise<Users[]>;
    getById(id: number): Promise<Users | null>;
    getByEmail(email: string): Promise<Users | null>;
    update(id: number, user: Users): Promise<Users | null>;
    delete(id: number): Promise<boolean>;
}

class UserRepository implements IUserRepository {
    async create(user: UserModel): Promise<Users> {
        try {
            return await Users.create({
                username: user.username,
                email: user.email,
                password: user.password,
                salt: user.salt,
                avatar: '',
                role: UserRole.User,
            });
        } catch (error) {
            throw new Error('Failed to create user: ' + error);
        }
    }

    async getAll(
        searchTerm: Partial<UserSearchTerm>,
        limit: number = 10,
        offset: number = 0,
    ): Promise<Users[]> {
        try {
            const where: any = {};
            if (searchTerm.username) {
                where.username = {
                    [Op.iLike]: `%${searchTerm.username}%`,
                };
            }
            if (searchTerm.email) {
                where.email = {
                    [Op.iLike]: `%${searchTerm.email}%`,
                };
            }

            // Thêm phân trang nếu có limit và offset
            const options: any = { where };
            if (limit) {
                options.limit = limit;
            }
            if (offset) {
                options.offset = offset;
            }

            return await Users.findAll(options);
        } catch (error) {
            throw new Error('Failed to find users: ' + error);
        }
    }

    async getById(id: number): Promise<Users | null> {
        try {
            return await Users.findByPk(id);
        } catch (error) {
            throw new Error('Failed to find user: ' + error);
        }
    }

    async getByEmail(email: string): Promise<Users | null> {
        try {
            return await Users.findOne({ where: { email } });
        } catch (error) {
            throw new Error('Failed to find user by email: ' + error);
        }
    }

    async update(id: number, user: UserModel): Promise<Users | null> {
        try {
            const existingUser = await Users.findByPk(id);
            if (!existingUser) {
                console.log('User not found');
                throw new Error('User not found');
            }
            await existingUser.update(user);
            return existingUser;
        } catch (error) {
            console.error('Failed to update user:', error);
            throw new Error('Failed to update user: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingUser = await Users.findByPk(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            await existingUser.destroy();
            return true; // Xóa thành công
        } catch (error) {
            console.error('Failed to delete user:', error);
            return false; // Xóa thất bại
        }
    }
}

export default UserRepository;
