import {
    FriendListDTO,
    FriendByIdDTO,
    FriendCreatedDTO,
    FriendUpdatedDTO,
} from '../../dtos/many-to-many/friend.dto';
import Friend from '../../models/postgresql/many-to-many/friend.model';
import { FriendModel } from '../../types/many-many/friend.type';


export class FriendListMapper {
    toDTO(friend: Friend): FriendListDTO {
        return {
            id: friend.id,
            userId: friend.userId,
            friendId: friend.friendId,
            status: friend.status,
            createdAt: friend.createdAt,
            updatedAt: friend.updatedAt,
        };
    }

    toDTOs(friends: Friend[]): FriendListDTO[] {
        return friends.map((friend) => this.toDTO(friend));
    }
}

export class FriendByIdMapper {
    toDTO(friend: Friend): FriendByIdDTO {
        return {
            id: friend.id,
            userId: friend.userId,
            friendId: friend.friendId,
            status: friend.status,
            createdAt: friend.createdAt,
            updatedAt: friend.updatedAt,
        };
    }
}

export class FriendCreatedMapper {
    toModel(friendDTO: FriendCreatedDTO): FriendModel {
        return {
            userId: friendDTO.userId,
            friendId: friendDTO.friendId,
            status: friendDTO.status ?? 'pending',
        };
    }
}

export class FriendUpdatedMapper {
    toModel(friendDTO: FriendUpdatedDTO): Partial<FriendModel> {
        return {
            status: friendDTO.status,
        };
    }
}
