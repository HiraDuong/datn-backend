import BaseRoutes from './base/base.routes';
import TaskController from '../controllers/task.controller';

class TaskRoutes extends BaseRoutes {
    routes(): void {
        this.router.get('/', TaskController.getAllTasks.bind(TaskController));
        this.router.get(
            '/:id',
            TaskController.getTaskById.bind(TaskController),
        );
        this.router.post('/', TaskController.createTask.bind(TaskController));
        this.router.put('/:id', TaskController.updateTask.bind(TaskController));
        this.router.delete(
            '/:id',
            TaskController.deleteTask.bind(TaskController),
        );
    }
}

export default new TaskRoutes().router;
