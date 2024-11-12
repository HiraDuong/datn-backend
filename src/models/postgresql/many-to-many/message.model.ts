/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-11-12 17:20:00
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 16:18:40
 * @ Description: message model
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
import { MessageModel } from '../../../types/many-many/message.type';

@Table({
    tableName: 'messages',
    timestamps: true,
})
export default class Message extends Model<MessageModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'message_id',
    })
    id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'sender_id',
    })
    senderId!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'receiver_id',
    })
    receiverId!: number;

    @Column({
        type: DataType.STRING(500),
        field: 'message_content',
        allowNull: false,
    })
    content!: string;

    @BelongsTo(() => Users, 'sender_id')
    sender!: Users;

    @BelongsTo(() => Users, 'receiver_id')
    receiver!: Users;
}
