export interface FriendListDTO {
    id: number;
    userId: number;
    friendId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FriendByIdDTO {
    id: number;
    userId: number;
    friendId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FriendCreatedDTO {
    userId: number;
    friendId: number;
    status?: string;
}

export interface FriendUpdatedDTO {
    status?: string;
}