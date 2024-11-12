export interface MessageModel {
    id?: number;
    senderId: number; // Foreign key từ bảng Users
    receiverId: number; // Foreign key từ bảng Users
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MessageSearchTerm {
    content: string | null;
}