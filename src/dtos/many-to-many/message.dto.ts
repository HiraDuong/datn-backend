export interface MessageListDTO {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MessageByIdDTO {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MessageCreatedDTO {
    content: string;
    senderId: number;
    receiverId: number;
}

export interface MessageUpdatedDTO {
    content?: string;
}