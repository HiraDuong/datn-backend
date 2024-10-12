import { UserListDTO } from "../dtos/user-list.dto";
import Users from "../models/postgresql/user.model";

export const toUserListDTO = (user: Users): UserListDTO => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
}

export const toUserListDTOs = (users: Users[]): UserListDTO[] => {
    return users.map(toUserListDTO);
}