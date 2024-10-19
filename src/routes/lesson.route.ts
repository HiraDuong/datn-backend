/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 02:12:08
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 18:26:29
 * @ Description:
 */

import BaseRoutes from './base/base.routes';
import LessonController from '../controllers/lesson.controller';

class LessonRoutes extends BaseRoutes {
    routes(): void {
        this.router.get(
            '/',
            LessonController.getAllLesson.bind(LessonController),
        );
        this.router.get(
            '/:id',
            LessonController.getLessonById.bind(LessonController),
        );
        this.router.post(
            '/',
            LessonController.createLesson.bind(LessonController),
        );
        this.router.put(
            '/:id',
            LessonController.updateLesson.bind(LessonController),
        );
        this.router.delete(
            '/:id',
            LessonController.deleteLesson.bind(LessonController),
        );
    }
}

export default new LessonRoutes().router;
