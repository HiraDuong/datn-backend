/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-17 00:39:28
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 18:25:06
 * @ Description: Course Repostory
 */

import { CourseModel, CourseSearchTerm } from '../types/course.type';
import Course from '../models/postgresql/course.model';
import { Op } from 'sequelize';

interface ICourseRepository {
    create(course: CourseModel): Promise<Course>;
    getAll(
        searchTerm: CourseSearchTerm,
        limit: number,
        offset: number,
    ): Promise<Course[]>;
    getById(id: number): Promise<Course | null>;
    update(id: number, course: Course): Promise<Course | null>;
    delete(id: number): Promise<boolean>;
}

class CourseRepository implements ICourseRepository {
    async create(course: CourseModel): Promise<Course> {
        try {
            return await Course.create({
                name: course.name,
                description: course.description,
                duration: course.duration,
                avatar: course.avatar ?? '',
            });
        } catch (error) {
            throw new Error(error + 'Failed to create course');
        }
    }
    async getAll(
        searchTerm: CourseSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<Course[]> {
        try {
            const where: any = {};
            if (searchTerm.name) {
                where.name = { [Op.iLike]: `%${searchTerm.name}%` };
            }
            const conditions: any = { where };
            if (limit) {
                conditions.limit = limit;
            }
            if (offset) {
                conditions.offset = offset;
            }
            return await Course.findAll(conditions);
        } catch (error) {
            throw new Error(error + 'Failed to get courses');
        }
    }
    async getById(id: number): Promise<Course | null> {
        try {
            return await Course.findByPk(id);
        } catch (error) {
            throw new Error(error + 'Failed to get courses');
        }
    }
    async update(id: number, course: Partial<Course>): Promise<Course | null> {
        try {
            const existingCourse = await Course.findByPk(id);
            if (!existingCourse) {
                throw new Error('Course not found');
            }
            await existingCourse.update(course);
            return existingCourse;
        } catch (error) {
            throw new Error(error + 'Failed to update course');
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const existingCourse = await Course.findByPk(id);
            if (!existingCourse) {
                throw new Error('Course not found');
            }
            await existingCourse.destroy();
            return true; // Xóa thành công
        } catch (error) {
            throw new Error(error + 'Failed to delete course');
        }
    }
}

export default CourseRepository;
