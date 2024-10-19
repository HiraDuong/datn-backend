import {
    CreateLessonDTO,
    LessonByIdDTO,
    ListLessonDTO,
    UpdateLessonDTO,
} from '../dtos/lesson.dto';
import Lesson from '../models/postgresql/lesson.model';
import { LessonModel } from '../types/lesson.type';
export class ListLessonMapper {
    toDTO(Lesson: Lesson): ListLessonDTO {
        return {
            id: Lesson.id,
            name: Lesson.name,
            description: Lesson.description,
            duration: Lesson.duration,
            number: Lesson.number,
            courseId: Lesson.courseId,
        };
    }
    toDTOs(lessons: Lesson[]): ListLessonDTO[] {
        return lessons.map((lesson) => this.toDTO(lesson));
    }
}

export class LessonByIdMapper {
    toDTO(lesson: Lesson): LessonByIdDTO {
        return {
            id: lesson.id,
            name: lesson.name,
            description: lesson.description,
            duration: lesson.duration,
            number: lesson.number,
            courseId: lesson.courseId,
            vocabulary: lesson.vocabulary,
            grammar: lesson.grammar,
            tasks: lesson.tasks,
        };
    }
}

export class CreateLessonMapper {
    toModel(lessonDTO: CreateLessonDTO): LessonModel {
        return {
            name: lessonDTO.name,
            description: lessonDTO.description,
            duration: lessonDTO.duration,
            number: lessonDTO.number,
            courseId: lessonDTO.courseId,
        };
    }
}

export class UpdateLessonMapper {
    toModel(updateLessonDTO: UpdateLessonDTO): Partial<LessonModel> {
        return {
            name: updateLessonDTO.name,
            description: updateLessonDTO.description,
            duration: updateLessonDTO.duration,
            number: updateLessonDTO.number,
            courseId: updateLessonDTO.courseId,
        };
    }
}
