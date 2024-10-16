import { UserByIdDTO, UserListDTO, UserUpdatedDTO } from '../dtos/user.dto';
import Users from '../models/postgresql/user.model';
import { UserModel } from '../types/user.type';
import { UserRole } from '../utils/constants.util';

export class UserListMapper {
    public toDTO(user: UserModel): UserListDTO {
        return {
            id: user.id || -1,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    public toDTOs(users: Users[]): UserListDTO[] {
        return users.map(this.toDTO);
    }
}

export class UserByIdMapper {
    public toDTO(user: Users): UserByIdDTO {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }
}

export class UserUpdatedMapper {
    toDTO(user: Users): UserUpdatedDTO {
        return {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            avatar: user.avatar,
        };
    }
    toEntity(id: number, dto: UserUpdatedDTO): Partial<UserModel> {
        return {
            id: id,
            username: dto.username,
            email: dto.email,
            role: dto.role || UserRole.User,
            avatar: dto.avatar,
            password: dto.password,
            salt: '',
        };
    }
}
