import { FriendByIdDTO } from "../../dtos/many-to-many/friend.dto";
import { FriendByIdMapper } from "../../mapper/many-to-many/friend.mapper";
import Friend from "../../models/postgresql/many-to-many/friend.model";
import FriendRepository from "../../repositories/many-many/friend.repository";
import { FriendModel } from "../../types/many-many/friend.type";


class FriendService {
    private readonly friendRepository: FriendRepository;
    private readonly friendByIdMapper: FriendByIdMapper;

    constructor() {
        this.friendRepository = new FriendRepository();
        this.friendByIdMapper = new FriendByIdMapper();
    }

    // create a new friend relationship
    async createFriend(friend: FriendModel): Promise<Friend> {
        try {
            return await this.friendRepository.create(friend);
        } catch (error) {
            throw new Error(error + 'Failed to create friend relationship');
        }
    }

    // list friends
    async getAllFriends(userId: number, limit: number = 10, offset: number = 0): Promise<FriendByIdDTO[]> {
        try {
            const friends = await this.friendRepository.getAll(userId, limit, offset);
            return friends.map((friend) => this.friendByIdMapper.toDTO(friend));
        } catch (error) {
            throw new Error(error + 'Failed to get friends');
        }
    }


    // delete friend relationship by id
    async deleteFriend(id: number): Promise<boolean> {
        try {
            const deletedFriend = await this.friendRepository.delete(id);
            return deletedFriend;
        } catch (error) {
            throw new Error(error + 'Failed to delete friend relationship by id');
        }
    }

    // get total records
    async getTotalRecords(): Promise<number> {
        return await this.friendRepository.getTotalRecords();
    }
}

export default FriendService;
