/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 01:00:04
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 01:25:31
 * @ Description: Trung gian giữa user và course
 */

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import User from '../user.model';
import Course from '../course.model';

@Table({ tableName: 'user_course' })
export default class UserCourse extends Model<UserCourse> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'users_id',
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        field: 'course_id',
        allowNull: false,
    })
    courseId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Course)
    course!: Course;
}
