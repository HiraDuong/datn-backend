export interface CommentModel {
    id?: number;
    postId: number; // Foreign key từ bảng Posts
    userId: number; // Foreign key từ bảng Users
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CommentSearchTerm {
    postId?: number | null;
    userId?: number | null;
    content?: string | null;
}
