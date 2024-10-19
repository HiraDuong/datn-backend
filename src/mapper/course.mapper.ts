/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-17 01:12:33
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 16:01:19
 * @ Description: Course Mapper between DTO and Model
 */

import {
    CourseByIdDTO,
    CreateCourseDTO,
    ListCourseDTO,
    UpdateCourseDTO,
} from '../dtos/course.dto';
import Course from '../models/postgresql/course.model';
import { CourseModel } from '../types/course.type';

export class ListCourseMapper {
    toDTO(course: Course): ListCourseDTO {
        return {
            id: course.id,
            name: course.name,
            description: course.description,
            duration: course.duration,
            avatar: course.avatar,
        };
    }
    toDTOs(courses: Course[]): ListCourseDTO[] {
        return courses.map((course) => this.toDTO(course));
    }
}

export class CourseByIdMapper {
    toDTO(course: Course): CourseByIdDTO {
        return {
            id: course.id,
            name: course.name,
            description: course.description,
            duration: course.duration,
            avatar: course.avatar,
            lessons: course.lessons,
        };
    }
}

export class CreateCourseMapper {
    toModel(courseDTO: CreateCourseDTO): CourseModel {
        return {
            name: courseDTO.name,
            description: courseDTO.description,
            duration: courseDTO.duration,
            avatar: courseDTO.avatar,
        };
    }
}

export class UpdateCourseMapper {
    toModel(updateCourseDTO: UpdateCourseDTO): Partial<CourseModel> {
        return {
            name: updateCourseDTO.name,
            description: updateCourseDTO.description,
            duration: updateCourseDTO.duration,
            avatar: updateCourseDTO.avatar,
        };
    }
}
