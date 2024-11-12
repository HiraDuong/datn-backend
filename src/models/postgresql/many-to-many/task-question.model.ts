/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 02:07:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:19:17
 * @ Description: trung gian giữa task và question
 */

import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Task from '../task.model';
import Question from '../question.model';

@Table({ tableName: 'task_question' })
export default class TaskQuestion extends Model<TaskQuestion> {
    @ForeignKey(() => Task)
    @Column({ field: 'task_id' })
    taskId!: number;

    @ForeignKey(() => Question)
    @Column({ field: 'question_id' })
    questionId!: number;

    @BelongsTo(() => Task)
    task?: Task;

    @BelongsTo(() => Question)
    question?: Question;
}
