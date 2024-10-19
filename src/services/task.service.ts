import { ListTaskDTO, TaskByIdDTO } from '../dtos/task.dto';
import { ListTaskMapper, TaskByIdMapper } from '../mapper/task.mapper';
import Task from '../models/postgresql/task.model';
import TaskRepository from '../repositories/task.repository';
import { TaskModel, TaskSearchTerm } from '../types/task.type';

class TaskService {
    // inject task repositories
    private readonly taskRepository: TaskRepository;

    // inject task mapper
    private readonly listTaskMapper: ListTaskMapper;
    private readonly taskByIdMapper: TaskByIdMapper;

    constructor() {
        this.taskRepository = new TaskRepository();
        this.listTaskMapper = new ListTaskMapper();
        this.taskByIdMapper = new TaskByIdMapper();
    }

    // create a new task
    async createTask(task: TaskModel): Promise<Task> {
        try {
            return await this.taskRepository.create(task);
        } catch (error) {
            throw new Error('Failed to create task: ' + error);
        }
    }
    // get all tasks
    async getAllTasks(
        searchTerm: TaskSearchTerm,
        limit: number,
        offset: number,
    ): Promise<ListTaskDTO[]> {
        try {
            const tasks = await this.taskRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.listTaskMapper.toDTOs(tasks);
        } catch (error) {
            throw new Error(error + 'Failed to get tasks');
        }
    }
    // get task by id
    async getTaskById(id: number): Promise<TaskByIdDTO | null> {
        try {
            const task = await this.taskRepository.getById(id);
            if (task) {
                return this.taskByIdMapper.toDTO(task);
            } else {
                throw new Error('Task not found');
            }
        } catch (error) {
            throw new Error('Failed to get task by id: ' + error);
        }
    }
    // update task by id
    async updateTask(
        id: number,
        task: Partial<TaskModel>,
    ): Promise<Task | null> {
        try {
            const updatedTask = await this.taskRepository.update(id, task);
            if (updatedTask) {
                return updatedTask;
            } else {
                throw new Error('Task not found');
            }
        } catch (error) {
            throw new Error('Failed to update task by id: ' + error);
        }
    }
    // delete task by id
    async deleteTask(id: number): Promise<boolean> {
        try {
            return await this.taskRepository.delete(id);
        } catch (error) {
            throw new Error('Failed to delete task by id: ' + error);
        }
    }
}

export default TaskService;
