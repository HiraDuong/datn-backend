/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 01:35:43
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-16 23:06:27
 * @ Description: Trung gian giữa lesson và task
 */

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Lesson from '../lesson.model';
import Task from '../task.model';

@Table({ tableName: 'lesson_task' })
export default class LessonTask extends Model<LessonTask> {
    @ForeignKey(() => Lesson)
    @Column({ field: 'lesson_id' })
    lessonId!: number;

    @ForeignKey(() => Task)
    @Column({ field: 'task_id' })
    taskId!: number;

    @BelongsTo(() => Lesson)
    lesson?: Lesson;

    @BelongsTo(() => Task)
    task?: Task;
}
