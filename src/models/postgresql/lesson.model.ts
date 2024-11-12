/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:27:06
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-24 02:59:15
 * @ Description: lesson model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import Task from './task.model';
import Course from './course.model';
import Vocabulary from './vocabulary.model';
import LessonVocabulary from './many-to-many/lesson-vocabulary.model';
import Grammar from './grammar.model';
import LessonGrammar from './many-to-many/lesson-grammar.model';
import { LessonModel } from '../../types/lesson.type';

@Table({
    tableName: 'lesson',
    timestamps: true,
})
export default class Lesson extends Model<LessonModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'lesson_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'lesson_name',
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'lesson_description',
        allowNull: false,
        defaultValue: 'No description',
    })
    description!: string;
    // thời lượng của bài học
    @Column({
        type: DataType.INTEGER,
        field: 'lesson_duration',
        allowNull: false,
        defaultValue: 0,
    })
    duration!: number;
    // Thứ tự trong khóa học
    @Column({
        type: DataType.INTEGER,
        field: 'lesson_number',
        allowNull: false,
        defaultValue: 0,
    })
    number!: number;

    //? Relationship
    //! With course
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        field: 'course_id',
        allowNull: false,
    })
    courseId!: number;

    @BelongsTo(() => Course, {
        foreignKey: 'course_id',
        targetKey: 'id',
        as: 'lessons',
        onDelete: 'CASCADE',
    })
    course!: Course;
    //! With tasks
    @HasMany(() => Task)
    tasks!: Task[];
    //! With vocabulary
    @BelongsToMany(() => Vocabulary, () => LessonVocabulary)
    vocabulary!: Vocabulary[];
    //! With grammar
    @BelongsToMany(() => Grammar, () => LessonGrammar)
    grammar!: Grammar[];
}
