/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-11-12 17:35:00
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 16:18:18
 * @ Description: friend model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Users from '../user.model';
import { FriendModel } from '../../../types/many-many/friend.type';

@Table({
    tableName: 'friends',
    timestamps: true,
})
export default class Friend extends Model<FriendModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'friend_id',
    })
    id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'friend_id',
    })
    friendId!: number;

    @Column({
        type: DataType.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        field: 'status',
        defaultValue: 'pending',
    })
    status!: string;

    @BelongsTo(() => Users, 'user_id')
    user!: Users;

    @BelongsTo(() => Users, 'friend_id')
    friend!: Users;
}
