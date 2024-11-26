import BaseRoutes from './base/base.routes';
import TaskController from '../controllers/task.controller';
import LessonController from '../controllers/lesson.controller';
class TaskRoutes extends BaseRoutes {
    routes(): void {
        
                // Thêm route cho quiz
                this.router.get(
                    '/',  // Định nghĩa route /quiz
                    LessonController.getQuizz.bind(LessonController),  // Liên kết với phương thức getQuiz trong controller
                );
    }
}

export default new TaskRoutes().router;
