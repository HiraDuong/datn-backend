/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:17:08
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 02:45:32
 * @ Description:
 */

import Users from "../models/postgresql/user.model";
import UserRepository from "../repositories/user.repository";
import { UserSearchTerm } from "../types/user.type";

class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Tạo người dùng mới
    public async createUser(user: Users): Promise<Users> {
        try {
            
            return await this.userRepository.save(user);
        } catch (error) {
            throw new Error("Failed to create user: " + error);
        }
    }

    // Lấy danh sách người dùng (với điều kiện tìm kiếm)
    public async getUsers(searchTerm: UserSearchTerm): Promise<Users[]> {
        try {
            return await this.userRepository.getAll(searchTerm);
        } catch (error) {
            throw new Error("Failed to get users: " + error);
        }
    }

    // Lấy người dùng theo ID
    public async getUserById(id: number): Promise<Users | null> {
        try {
            const user = await this.userRepository.getById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error("Failed to get user: " + error);
        }
    }

    // Cập nhật thông tin người dùng
    public async updateUser(id: number, user: Users): Promise<Users | null> {
        try {
            const updatedUser = await this.userRepository.update(id, user);
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return updatedUser;
        } catch (error) {
            throw new Error("Failed to update user: " + error);
        }
    }

    // Xóa người dùng
    public async deleteUser(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new Error("Failed to delete user: " + error);
        }
    }
}

export default UserService;
