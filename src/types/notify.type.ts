export interface NotifyModel {
    id?: number;
    userId: number; // Foreign key từ bảng Users
    message: string;
    isRead: boolean; // Trạng thái đã đọc hay chưa
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotifySearchTerm {
    content: string | null;
}