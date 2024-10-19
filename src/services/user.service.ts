/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:17:08
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-16 23:40:20
 * @ Description: user service
 */

import { UserByIdDTO, UserListDTO, UserUpdatedDTO } from '../dtos/user.dto';
import {
    UserByIdMapper,
    UserListMapper,
    UserUpdatedMapper,
} from '../mapper/user.mapper';
import Users from '../models/postgresql/user.model';
import UserRepository from '../repositories/user.repository';
import { UserModel, UserSearchTerm } from '../types/user.type';
import { generateSalt, hashPasswordWithSalt } from '../utils/bycrypt.util';

class UserService {
    // inject userRepository, userMapper
    private readonly userRepository: UserRepository;
    private readonly userListMapper: UserListMapper;
    private readonly userByIdMapper: UserByIdMapper;
    private readonly userUpdatedMapper: UserUpdatedMapper;
    constructor() {
        this.userRepository = new UserRepository();
        this.userListMapper = new UserListMapper();
        this.userByIdMapper = new UserByIdMapper();
        this.userUpdatedMapper = new UserUpdatedMapper();
    }

    // Tạo người dùng mới
    public async createUser(user: Users): Promise<Users> {
        try {
            return await this.userRepository.create(user);
        } catch (error) {
            throw new Error('Failed to create user: ' + error);
        }
    }

    // Lấy danh sách người dùng (với điều kiện tìm kiếm (username, email))
    public async getUsers(
        searchTerm: UserSearchTerm,
        limit: number,
        offset: number,
    ): Promise<UserListDTO[]> {
        try {
            const users = await this.userRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.userListMapper.toDTOs(users);
        } catch (error) {
            throw new Error('Failed to get users: ' + error);
        }
    }

    // Lấy người dùng theo ID
    public async getUserById(id: number): Promise<UserByIdDTO | null> {
        try {
            const user = await this.userRepository.getById(id);
            if (user) {
                return this.userByIdMapper.toDTO(user);
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error('Failed to get user: ' + error);
        }
    }

    // Cập nhật thông tin người dùng
    public async updateUser(
        id: number,
        updatedUser: Partial<UserModel>,
    ): Promise<UserUpdatedDTO> {
        try {
            //   check if user exists
            const existUser = await this.userRepository.getById(id);
            if (!existUser) {
                throw new Error('User not found');
            }
            // neu doi pass
            if (updatedUser.password) {
                // check xem password co thay doi khong
                const hashedPassword = await hashPasswordWithSalt(
                    updatedUser.password,
                    existUser.salt,
                );
                if (hashedPassword === existUser.password) {
                    throw new Error('Password is the same as the old one');
                }
                // generate new salt
                const salt = await generateSalt();
                // generate new hashed password
                updatedUser.password = await hashPasswordWithSalt(
                    updatedUser.password,
                    salt,
                );
                updatedUser.salt = salt;
            }
            // check xem cac truong khac, truong nao null hoac undefined hay "" thi giu nguyen
            const userToUpdate = {
                ...existUser, // Dữ liệu cũ
                username: updatedUser.username ?? existUser.username,
                email: updatedUser.email ?? existUser.email,
                role: updatedUser.role ?? existUser.role,
                avatar: updatedUser.avatar ?? existUser.avatar,
                password: updatedUser.password ?? existUser.password,
                salt: updatedUser.salt ?? existUser.salt,
            };
            const result = await this.userRepository.update(id, userToUpdate);
            if (result)
                return this.userUpdatedMapper.toDTO(result); // tra ve thong tin user sau khi update
            else throw new Error('update user failed'); // neu update that bai thi throw loi
        } catch (error) {
            throw new Error('update user failed: ' + error);
        }
    }

    // Xóa người dùng
    public async deleteUser(id: number): Promise<boolean> {
        try {
            await this.userRepository.delete(id);
            // Xóa các thông tin tương ứng (ví dụ: xóa các bài viết, bình luận, react vv của người dùng)
            return true; // tra ve true neu xoa thanh cong
        } catch (error) {
            throw new Error('Failed to delete user: ' + error);
        }
    }
}

export default UserService;
