import { Request, Response } from 'express';
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
    TaskType,
} from '../utils/constants.util';
import TaskService from '../services/task.service';
import { CreateTaskMapper, UpdateTaskMapper } from '../mapper/task.mapper';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/task.dto';

class TaskController {
    private readonly taskService: TaskService;
    private readonly createTaskMapper: CreateTaskMapper;
    private readonly updateTaskMapper: UpdateTaskMapper;

    constructor() {
        this.taskService = new TaskService();
        this.createTaskMapper = new CreateTaskMapper();
        this.updateTaskMapper = new UpdateTaskMapper();
    }

    // get list task
    async getAllTasks(req: Request, res: Response) {
        const offset = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const type = req.query.type as TaskType;
        const name = req.query.name as string;
        const lessonId = parseInt(req.query.lessonId as string);
        try {
            const tasks = await this.taskService.getAllTasks(
                { name, type, lessonId },
                limit,
                offset,
            );
            res.status(200).json({
                message: MESSAGE_SUCCESS,
                data: tasks,
            });
        } catch (error) {
            res.status(200).json({
                message: MESSAGE_ERR,
                error,
            });
        }
    }
    // get task by id
    async getTaskById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const task = await this.taskService.getTaskById(id);
            if (!task) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Task not found',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: task,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
    // create new task
    async createTask(req: Request, res: Response) {
        const taskDTO = req.body as CreateTaskDTO;
        try {
            const taskModel = this.createTaskMapper.toModel(taskDTO);
            const newTask = await this.taskService.createTask(taskModel);
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: newTask,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR_CREATE,
                data: error.message,
            });
        }
    }
    // update task
    async updateTask(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const taskDTO = req.body as UpdateTaskDTO;
        const taskModel = this.updateTaskMapper.toModel(taskDTO);
        try {
            const updatedTask = await this.taskService.updateTask(
                id,
                taskModel,
            );
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedTask,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR_UPDATE,
                data: error.message,
            });
        }
    }
    // delete task
    async deleteTask(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const result = await this.taskService.deleteTask(id);
            if (!result) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Task not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
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

export default new TaskController();
