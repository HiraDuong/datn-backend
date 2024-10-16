/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 01:05:48
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:53:32
 * @ Description: Trung gian giữa user và task
 */

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Task from '../task.model';
import User from '../user.model';

@Table({ tableName: 'users_task' })
export default class UserTask extends Model<UserTask> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'users_id',
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
        field: 'task_id',
        allowNull: false,
    })
    taskId!: number;

    @Column({
        type: DataType.INTEGER,
        field: 'score',
        allowNull: false,
        defaultValue: 0,
    })
    @BelongsTo(() => User, { as: 'userAssociation' }) // Thay đổi alias cho association
    user!: User; // Giữ lại thuộc tính

    @BelongsTo(() => Task)
    task!: Task;
}
