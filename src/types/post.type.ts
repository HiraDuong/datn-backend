export interface PostModel {
    id?: number;
    userId: number; 
    content: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PostSearchTerm {
    userId?: number | null;
    content?: string | null;
}
