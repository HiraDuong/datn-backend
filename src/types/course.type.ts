export interface CourseModel {
    id?: number;
    name: string;
    description: string;
    duration: number;
    avatar: string;
}

export interface CourseSearchTerm {
    name?: string;
}
