

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Users from './user.model';
import { NotifyModel } from '../../types/notify.type';

@Table({
    tableName: 'notifications',
    timestamps: true,
})
export default class Notify extends Model<NotifyModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'notify_id',
    })
    id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId!: number;

    @Column({
        type: DataType.STRING(255),
        field: 'notify_message',
        allowNull: false,
    })
    message!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: 'is_read',
        allowNull: false,
        defaultValue: false,
    })
    isRead!: boolean;

    @BelongsTo(() => Users)
    user!: Users;
}
