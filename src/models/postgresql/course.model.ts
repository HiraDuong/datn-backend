/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:24:37
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 01:46:49
 * @ Description: course model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import Lesson from './lesson.model';
import Users from './user.model';
import UserCourse from './many-many/user-course.model';

@Table({
    tableName: 'course',
    timestamps: true,
})
export default class Course extends Model<Course> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'course_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'course_name',
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'course_description',
        allowNull: false,
        defaultValue: 'No description',
    })
    description!: string;
    // thời lượng của khóa học
    @Column({
        type: DataType.INTEGER,
        field: 'course_duration',
        allowNull: false,
        defaultValue: 0,
    })
    duration!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'course_avatar',
        defaultValue: 'https://i.imgur.com/0wbrCkz.png',
    })
    avatar!: string;

    //? Relationships
    //! With users
    @BelongsToMany(() => Users, () => UserCourse)
    users!: Users[];
    //! With lesson
    @HasMany(() => Lesson)
    lessons!: Lesson[];
}
