
import { Op } from 'sequelize';
import { MessageModel, MessageSearchTerm } from '../../types/many-many/message.type';
import Message from '../../models/postgresql/many-to-many/message.model';

interface IMessageRepository {
    create(message: MessageModel): Promise<Message>;
    getAll(searchTerm: MessageSearchTerm, limit: number, offset: number): Promise<Message[]>;
    getById(id: number): Promise<Message | null>;

    update(id: number, message: Partial<MessageModel>): Promise<Message | null>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class MessageRepository implements IMessageRepository {
    async getTotalRecords(): Promise<number> {
        return await Message.count();
    }

    async create(message: MessageModel): Promise<Message> {
        try {
            return await Message.create({
                senderId: message.senderId,
                receiverId: message.receiverId,
                content: message.content,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
            });
        } catch (error) {
            throw new Error('Failed to create message: ' + error);
        }
    }

    async getAll(searchTerm: MessageSearchTerm, limit: number = 10, offset: number = 0): Promise<Message[]> {
        try {
            const where: any = {};
            if (searchTerm.content) {
                where.content = { [Op.iLike]: `%${searchTerm.content}%` };
            }
            const conditions: any = { where };
            if (limit) conditions.limit = limit;
            if (offset) conditions.offset = offset;
            return await Message.findAll(conditions);
        } catch (error) {
            throw new Error('Failed to get messages: ' + error);
        }
    }

    async getById(id: number): Promise<Message | null> {
        try {
            return await Message.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get message: ' + error);
        }
    }

    async update(id: number, message: Partial<MessageModel>): Promise<Message | null> {
        try {
            const existingMessage = await Message.findByPk(id);
            if (!existingMessage) throw new Error('Message not found');
            await existingMessage.update(message);
            return existingMessage;
        } catch (error) {
            throw new Error('Failed to update message: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingMessage = await Message.findByPk(id);
            if (!existingMessage) throw new Error('Message not found');
            await existingMessage.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete message: ' + error);
        }
    }
}

export default MessageRepository;