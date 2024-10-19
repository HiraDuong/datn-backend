import { TaskType } from '../utils/constants.util';

export interface TaskModel {
    id?: number;
    name: string;
    description: string;
    duration: number;
    type: TaskType;
    lessonId: number;
}

export interface TaskSearchTerm {
    name?: string;
    type?: TaskType;
    lessonId: number;
}
