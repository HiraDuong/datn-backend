
export interface NotifyListDTO {
    id: number;
    message: string;
    userId: number;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotifyByIdDTO {
    id: number;
    message: string;
    userId: number;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotifyCreatedDTO {
    message: string;
    userId: number;
}

export interface NotifyUpdatedDTO {
    isRead?: boolean;
}
