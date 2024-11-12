import MessageRepository from '../../repositories/many-many/message.repository';
import { MessageModel } from '../../types/many-many/message.type';
import { MessageByIdDTO, MessageListDTO, MessageUpdatedDTO } from '../../dtos/many-to-many/message.dto';
import {
    MessageByIdMapper,
    MessageListMapper,
    MessageUpdatedMapper,
} from '../../mapper/many-to-many/message.mapper';
import Messages from '../../models/postgresql/many-to-many/message.model';

class MessageService {
    private readonly messageRepository: MessageRepository;
    private readonly messageListMapper: MessageListMapper;
    private readonly messageByIdMapper: MessageByIdMapper;
    private readonly messageUpdatedMapper: MessageUpdatedMapper;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.messageListMapper = new MessageListMapper();
        this.messageByIdMapper = new MessageByIdMapper();
        this.messageUpdatedMapper = new MessageUpdatedMapper();
    }

    // Gửi tin nhắn mới
    public async sendMessage(message: Messages): Promise<Messages> {
        try {
            return await this.messageRepository.create(message);
        } catch (error) {
            throw new Error('Failed to send message: ' + error);
        }
    }

    // Lấy danh sách tin nhắn
    public async getMessages(limit: number, offset: number): Promise<MessageListDTO[]> {
        try {
            const messages = await this.messageRepository.getAll({content: null}, limit, offset);
        return this.messageListMapper.toDTOs(messages);
        } catch (error) {
            throw new Error('Failed to get messages: ' + error);
        }
    }

    // Lấy tin nhắn theo ID
    public async getMessageById(id: number): Promise<MessageByIdDTO | null> {
        try {
            const message = await this.messageRepository.getById(id);
            if (message) {
                return this.messageByIdMapper.toDTO(message);
            } else {
                throw new Error('Message not found');
            }
        } catch (error) {
            throw new Error('Failed to get message: ' + error);
        }
    }

    // Cập nhật tin nhắn
    public async updateMessage(id: number, updatedMessage: Partial<MessageModel>): Promise<MessageUpdatedDTO> {
        try {
            const existMessage = await this.messageRepository.getById(id);
            if (!existMessage) {
                throw new Error('Message not found');
            }
            const result = await this.messageRepository.update(id, updatedMessage);
            if (result) {
                return result;
            } else {
                throw new Error('Update message failed');
            }
        } catch (error) {
            throw new Error('Update message failed: ' + error);
        }
    }

    // Xóa tin nhắn
    public async deleteMessage(id: number): Promise<boolean> {
        try {
            await this.messageRepository.delete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete message: ' + error);
        }
    }
}

export default MessageService;
