/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 00:46:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 19:32:58
 * @ Description:Course Controller
 */
import { Request, Response } from 'express';

import CourseService from '../services/course.service';
import { CreateCourseDTO, UpdateCourseDTO } from '../dtos/course.dto';
import {
    CODE_CREATED,
    CODE_ERR,
    CODE_ERR_NOT_FOUND,
    CODE_NO_CONTENT,
    CODE_SUCCESS,
    MESSAGE_CREATED,
    MESSAGE_DELETED,
    MESSAGE_ERR,
    MESSAGE_ERR_CREATE,
    MESSAGE_ERR_NOT_FOUND,
    MESSAGE_ERR_UPDATE,
    MESSAGE_SUCCESS,
    MESSAGE_UPDATED,
} from '../utils/constants.util';
import {
    CreateCourseMapper,
    UpdateCourseMapper,
} from '../mapper/course.mapper';

class CourseController {
    private readonly courseService: CourseService;
    private readonly updateCourseMapper: UpdateCourseMapper;
    private readonly createCourseMapper: CreateCourseMapper;
    constructor() {
        this.courseService = new CourseService();
        this.updateCourseMapper = new UpdateCourseMapper();
        this.createCourseMapper = new CreateCourseMapper();
    }

    async listCourse(req: Request, res: Response) {
        const name = req.query.name as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const courses = await this.courseService.getAllCourses(
                { name },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: courses,
            };
            return res.status(200).json(response);
        } catch (error: Error | any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async getCourseById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const course = await this.courseService.getCourseById(id);
            if (!course) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Course not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: course,
            };
            return res.status(200).json(response);
        } catch (error: Error | any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async createCourse(req: Request, res: Response) {
        const { name, description, duration, avatar } = req.body;
        const createCourseDTO: CreateCourseDTO = {
            name,
            description,
            duration,
            avatar,
        };
        const course = this.createCourseMapper.toModel(createCourseDTO);

        try {
            const createdCourse = await this.courseService.createCourse(course);
            if (!createdCourse) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Course created failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdCourse,
            });
        } catch (error: Error | any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateCourse(req: Request, res: Response) {
        const id = req.params.id;
        const { name, description, duration, avatar } = req.body;
        const courseUpdateDTO: UpdateCourseDTO = {
            name,
            description,
            duration,
            avatar,
        };
        const course = this.updateCourseMapper.toModel(courseUpdateDTO);
        try {
            const updatedCourse = await this.courseService.updateCourse(
                parseInt(id),
                course,
            );
            if (!updatedCourse) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Course updated failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedCourse,
            });
        } catch (error: Error | any) {
            return res.status(500).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteCourse(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedCourse = await this.courseService.deleteCourse(id);
            if (!deletedCourse) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Course not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Course deleted successfully',
            });
        } catch (error: Error | any) {
            return res.status(500).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
}

export default new CourseController();
