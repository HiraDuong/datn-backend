export interface LessonModel {
    id?: number;
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
}

export interface LessonSearchTerm {
    name?: string;
}
