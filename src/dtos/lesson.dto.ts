import Grammar from '../models/postgresql/grammar.model';
import Task from '../models/postgresql/task.model';
import Vocabulary from '../models/postgresql/vocabulary.model';

export interface ListLessonDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
}
export interface LessonByIdDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
    vocabulary: Vocabulary[];
    grammar: Grammar[];
    tasks: Task[];
}
export interface CreateLessonDTO {
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
}
export interface UpdateLessonDTO {
    name?: string;
    description?: string;
    duration?: number;
    number?: number;
    courseId?: number;
}
