export interface FriendModel {
    id?: number;
    userId: number; // Foreign key từ bảng Users
    friendId: number; // Foreign key từ bảng Users
    status: string; // Trạng thái kết bạn: 'pending', 'accepted', 'rejected'
    createdAt?: Date;
    updatedAt?: Date;
}

