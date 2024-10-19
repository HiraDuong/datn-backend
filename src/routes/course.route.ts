/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 01:32:08
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 01:36:26
 * @ Description:
 */

import BaseRoutes from './base/base.routes';
import CourseController from '../controllers/course.controller';
class CourseRoutes extends BaseRoutes {
    routes(): void {
        this.router.get(
            '/',
            CourseController.listCourse.bind(CourseController),
        );
        this.router.get(
            '/:id',
            CourseController.getCourseById.bind(CourseController),
        );
        this.router.post(
            '/',
            CourseController.createCourse.bind(CourseController),
        );
        this.router.put(
            '/:id',
            CourseController.updateCourse.bind(CourseController),
        );
        this.router.delete(
            '/:id',
            CourseController.deleteCourse.bind(CourseController),
        );
    }
}

export default new CourseRoutes().router;
