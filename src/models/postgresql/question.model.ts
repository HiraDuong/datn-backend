/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 02:01:31
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:09:22
 * @ Description: questions model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
} from 'sequelize-typescript';
import Task from './task.model';
import TaskQuestion from './many-to-many/task-question.model';

@Table({
    tableName: 'question',
    timestamps: true,
})
export default class Question extends Model<Question> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'question_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'question_content',
    })
    content!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'question_answer',
    })
    answer!: string;

    //? Relationships
    //! With task
    @BelongsToMany(() => Task, () => TaskQuestion)
    tasks!: Task[];
}
