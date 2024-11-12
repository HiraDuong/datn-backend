

export interface PostListDTO {
    id: number;
    content: string;
    image?: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostByIdDTO {
    id: number;
    content: string;
    image?: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostCreatedDTO {
    content: string;
    image?: string;
    userId: number;
}

export interface PostUpdatedDTO {
    content?: string;
    image?: string;
}
