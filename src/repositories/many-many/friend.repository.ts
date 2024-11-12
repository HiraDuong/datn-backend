
import { Op } from 'sequelize';
import { FriendModel } from '../../types/many-many/friend.type';
import Friend from '../../models/postgresql/many-to-many/friend.model';

interface IFriendRepository {
    create(friend: FriendModel): Promise<Friend>;
    getAll(userId: number, limit: number, offset: number): Promise<Friend[]>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class FriendRepository implements IFriendRepository {
    async getTotalRecords(): Promise<number> {
        return await Friend.count();
    }

    async create(friend: FriendModel): Promise<Friend> {
        try {
            return await Friend.create(friend);
        } catch (error) {
            throw new Error('Failed to add friend: ' + error);
        }
    }

    async getAll(userId: number, limit: number = 10, offset: number = 0): Promise<Friend[]> {
        try {
            return await Friend.findAll({
                where: {
                    [Op.or]: [{ userId: userId }, { friendId: userId }],
                },
                limit: limit,
                offset: offset,
            });
        } catch (error) {
            throw new Error('Failed to get friends: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingFriend = await Friend.findByPk(id);
            if (!existingFriend) throw new Error('Friendship not found');
            await existingFriend.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete friendship: ' + error);
        }
    }
}

export default FriendRepository;
