
import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
} from 'sequelize-typescript';
import { ProcessModel } from '../../../types/many-many/process.type';
import Course from '../course.model';
import Users from '../user.model';

@Table({
    tableName: 'process',
    timestamps: true,
})

export default class Process extends Model<ProcessModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'process_id',
    })
    id!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'course_id',
    })
    courseId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'lesson_id',
    })
    lessonId!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId!: number;
    
}