import {
    CreateTaskDTO,
    ListTaskDTO,
    TaskByIdDTO,
    UpdateTaskDTO,
} from '../dtos/task.dto';
import { TaskModel } from '../types/task.type';

export class ListTaskMapper {
    toDTO(task: ListTaskDTO) {
        return {
            id: task.id,
            name: task.name,
            description: task.description,
            duration: task.duration,
            type: task.type,
            lessonId: task.lessonId,
        };
    }
    toDTOs(tasks: ListTaskDTO[]) {
        return tasks.map((task) => this.toDTO(task));
    }
}

export class TaskByIdMapper {
    toDTO(task: TaskByIdDTO) {
        return {
            id: task.id,
            name: task.name,
            description: task.description,
            duration: task.duration,
            type: task.type,
            lessonId: task.lessonId,
            questions: task.questions,
        };
    }
}

export class CreateTaskMapper {
    toModel(createTaskDTO: CreateTaskDTO): TaskModel {
        return {
            name: createTaskDTO.name,
            description: createTaskDTO.description,
            duration: createTaskDTO.duration,
            type: createTaskDTO.type,
            lessonId: createTaskDTO.lessonId,
        };
    }
}

export class UpdateTaskMapper {
    toModel(updateTaskDTO: UpdateTaskDTO): Partial<TaskModel> {
        return {
            name: updateTaskDTO.name,
            description: updateTaskDTO.description,
            duration: updateTaskDTO.duration,
            type: updateTaskDTO.type,
            lessonId: updateTaskDTO.lessonId,
        };
    }
}
