/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 01:47:43
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 16:07:15
 * @ Description: user model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
} from 'sequelize-typescript';
import { UserRole } from '../../utils/constants.util';
import Course from './course.model';
import Task from './task.model';
import UserTask from './many-to-many/user-task.model';
import UserCourse from './many-to-many/user-course.model';
import { UserModel } from '../../types/user.type';

@Table({
    tableName: 'users',
    timestamps: true,
})
export default class Users extends Model<UserModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'users_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'users_username',
        allowNull: false,
        unique: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'users_email',
        unique: true,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'users_password',
        allowNull: false,
    })
    password!: string;

    // salt dùng để mã hóa mật khẩu
    @Column({
        type: DataType.STRING(100),
        field: 'users_salt',
        unique: true,
        allowNull: false,
    })
    salt!: string;

    @Column({
        type: DataType.ENUM('admin', 'user'),
        field: 'users_role',
        allowNull: false,
        defaultValue: UserRole.User,
    })
    role!: UserRole;

    @Column({
        type: DataType.STRING(100),
        field: 'users_avatar',
        defaultValue: 'https://i.imgur.com/hepj9ZS.png',
    })
    avatar!: string;

    //? Relationships
    //! With task ( test and exercise )
    @BelongsToMany(() => Task, () => UserTask)
    tasks!: Task[];
    //! With course
    @BelongsToMany(() => Course, () => UserCourse)
    courses!: Course[];
}
