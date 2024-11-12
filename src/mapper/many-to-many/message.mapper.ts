import Message from '../../models/postgresql/many-to-many/message.model';
import {
    MessageListDTO,
    MessageByIdDTO,
    MessageCreatedDTO,
    MessageUpdatedDTO,
} from '../../dtos/many-to-many/message.dto';
import { MessageModel } from '../../types/many-many/message.type';

export class MessageListMapper {
    toDTO(message: Message): MessageListDTO {
        return {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            receiverId: message.receiverId,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
    }

    toDTOs(messages: Message[]): MessageListDTO[] {
        return messages.map((message) => this.toDTO(message));
    }
}

export class MessageByIdMapper {
    toDTO(message: Message): MessageByIdDTO {
        return {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            receiverId: message.receiverId,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
    }
}

export class MessageCreatedMapper {
    toModel(messageDTO: MessageCreatedDTO): MessageModel {
        return {
            content: messageDTO.content,
            senderId: messageDTO.senderId,
            receiverId: messageDTO.receiverId,
        };
    }
}

export class MessageUpdatedMapper {
    toModel(messageDTO: MessageUpdatedDTO): Partial<MessageModel> {
        return {
            content: messageDTO.content,
        };
    }
}
