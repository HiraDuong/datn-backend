/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:31:46
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:34:14
 * @ Description: Task model là gộp của test và exercise
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { TaskType } from '../../utils/constants.util';
import UserTask from './many-many/user-task.model';
import Users from './user.model';
import Lesson from './lesson.model';
import Question from './question.model';
import TaskQuestion from './many-many/task-question.model';

@Table({
    tableName: 'task',
    timestamps: true,
})
export default class Task extends Model<Task> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'task_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'task_name',
    })
    name!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'task_description',
    })
    description!: string;

    @Column({
        type: DataType.INTEGER,
        field: 'task_duration',
    })
    duration!: number;
    // phân biệt test và exercise
    @Column({
        type: DataType.ENUM('test', 'exercise'),
        field: 'task_type',
    })
    type!: TaskType;

    //? Relationships
    //! With users
    @BelongsToMany(() => Users, () => UserTask)
    users!: Users[];
    //! With lesson
    @ForeignKey(() => Lesson)
    @Column({ field: 'lesson_id' })
    lessonId!: number;

    @BelongsTo(() => Lesson)
    lessons!: Lesson;
    //! With question
    @BelongsToMany(() => Question, () => TaskQuestion)
    questions!: Question[];
}