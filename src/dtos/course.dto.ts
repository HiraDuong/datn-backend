/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-17 01:12:22
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-24 03:18:20
 * @ Description: Course DTO
 */

import Lesson from '../models/postgresql/lesson.model';
import { ListLessonDTO } from './lesson.dto';

export interface ListCourseDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    avatar: string;
}

export interface CourseByIdDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    avatar: string;
    lessons: ListLessonDTO[];
}

export interface CreateCourseDTO {
    name: string;
    description: string;
    duration: number;
    avatar: string;
}

export interface UpdateCourseDTO {
    name?: string;
    description?: string;
    duration?: number;
    avatar?: string;
}
