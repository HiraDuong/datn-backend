import {
    CreateLessonMapper,
    UpdateLessonMapper,
} from '../mapper/lesson.mapper';
import LessonService from '../services/lesson.service';
import {
    CODE_CREATED,
    CODE_ERR,
    MESSAGE_ERR,
    MESSAGE_SUCCESS,
} from '../utils/constants.util';
import { Request, Response } from 'express';
class LessonController {
    // inject dependencies
    private readonly lessonService: LessonService;
    private readonly createLessonMapper: CreateLessonMapper;
    private readonly updateLessonMapper: UpdateLessonMapper;

    constructor() {
        this.lessonService = new LessonService();
        this.createLessonMapper = new CreateLessonMapper();
        this.updateLessonMapper = new UpdateLessonMapper();
    }

    // lấy tất cả lesson
    async getAllLesson(req: Request, res: Response) {
        const name = req.query.name as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);
        try {
            const lessons = await this.lessonService.getAllLessons(
                { name },
                limit,
                offset,
            );
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_SUCCESS,
                data: lessons,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    // lấy lesson theo id
    async getLessonById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const lesson = await this.lessonService.getLessonById(id);
            if (!lesson) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'Lesson not found',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_SUCCESS,
                data: lesson,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
    // tạo mới lesson
    async createLesson(req: Request, res: Response) {
        const lesson = req.body;
        try {
            const newLesson = await this.lessonService.createLesson(lesson);
            return res.status(201).json({
                code: CODE_CREATED,
                message: MESSAGE_SUCCESS,
                data: newLesson,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    // cập nhật lesson theo id
    async updateLesson(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const lesson = req.body;
        try {
            const updatedLesson = await this.lessonService.updateLesson(
                id,
                lesson,
            );
            if (!updatedLesson) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'Lesson not found',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_SUCCESS,
                data: updatedLesson,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
    // xóa lesson theo id
    async deleteLesson(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const result = await this.lessonService.deleteLesson(id);
            if (!result) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'Lesson not found',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_SUCCESS,
                data: 'Lesson deleted',
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
}

export default new LessonController();
