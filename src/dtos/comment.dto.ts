export interface CommentDTO {
    id: number;
    postId: number;
    userId: number;
    content: string;
}

export interface CreateCommentDTO {
    postId: number;
    userId: number;
    content: string;
}

export interface UpdateCommentDTO {
    content?: string;
}