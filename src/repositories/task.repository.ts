import { Op } from 'sequelize';
import Task from '../models/postgresql/task.model';
import { TaskModel, TaskSearchTerm } from '../types/task.type';

interface ITaskRepository {
    create(task: TaskModel): Promise<Task>;
    getAll(
        searchTerm: TaskSearchTerm,
        limit: number,
        offset: number,
    ): Promise<Task[]>;
    getById(id: number): Promise<Task | null>;
    update(id: number, task: Task): Promise<Task | null>;
    delete(id: number): Promise<boolean>;
}

class TaskRepository implements ITaskRepository {
    async create(task: TaskModel): Promise<Task> {
        try {
            return await Task.create({
                name: task.name,
                description: task.description,
                type: task.type,
                duration: task.duration,
                lessonId: task.lessonId,
            });
        } catch (error) {
            throw new Error('Failed to create task: ' + error);
        }
    }

    async getAll(
        searchTerm: TaskSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<Task[]> {
        try {
            const where: any = {};
            if (searchTerm.name) {
                where.name = { [Op.iLike]: `%${searchTerm.name}%` };
            }
            if (searchTerm.type) {
                where.type = searchTerm.type;
            }
            if (searchTerm.lessonId) {
                where.lessonId = searchTerm.lessonId;
            }
            const conditions: any = { where };
            if (limit) {
                conditions.limit = limit;
            }
            if (offset) {
                conditions.offset = offset;
            }
            return await Task.findAll(conditions);
        } catch (error) {
            throw new Error('Failed to get tasks: ' + error);
        }
    }

    async getById(id: number): Promise<Task | null> {
        try {
            return await Task.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get task by id: ' + error);
        }
    }

    async update(id: number, task: Partial<Task>): Promise<Task | null> {
        try {
            const existingTask = await Task.findByPk(id);
            if (!existingTask) {
                return null;
            }
            return await existingTask.update(task);
        } catch (error) {
            throw new Error('Failed to update task: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingTask = await Task.findByPk(id);
            if (!existingTask) {
                return false;
            }
            await existingTask.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete task: ' + error);
        }
    }
}

export default TaskRepository;
