/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 01:53:56
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 02:21:50
 * @ Description:
 */

import Users from "../models/postgresql/user.model";

import { Op } from "sequelize";
import { UserSearchTerm } from "../types/user.type";

interface IUserRepository {
    save(user: Users): Promise<Users>;
    getAll(searchTerm: UserSearchTerm): Promise<Users[]>;

    getById(id: number): Promise<Users | null>;
    update(id: number, user: Users): Promise<Users | null>;
    delete(id: number): Promise<void>;
}

class UserRepository implements IUserRepository {
    async save(user: Users): Promise<Users> {
        try {
            return await Users.create(user);
        } catch (error) {
            throw new Error("Failed to create user: " + error);
        }
    }

    async getAll(searchTerm: UserSearchTerm): Promise<Users[]> {
        try {
            const { username, email, role } = searchTerm;
            const where: any = {};

            if (username) {
                where.username = { [Op.like]: `%${username}%` };
            }
            if (email) {
                where.email = { [Op.like]: `%${email}%` };
            }
            if (role) {
                where.role = role;
            }

            return await Users.findAll({ where });
        } catch (error) {
            throw new Error("Failed to retrieve users: " + error);
        }
    }

    async getById(id: number): Promise<Users | null> {
        try {
            return await Users.findByPk(id);
        } catch (error) {
            throw new Error("Failed to find user: " + error);
        }
    }

    async update(id: number, user: Users): Promise<Users | null> {
        try {
            const existingUser = await Users.findByPk(id);
            if (!existingUser) {
                throw new Error("User not found");
            }
            await existingUser.update(user);
            return existingUser;
        } catch (error) {
            throw new Error("Failed to update user: " + error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existingUser = await Users.findByPk(id);
            if (!existingUser) {
                throw new Error("User not found");
            }
            await existingUser.destroy();
        } catch (error) {
            throw new Error("Failed to delete user: " + error);
        }
    }
}

export default UserRepository;

