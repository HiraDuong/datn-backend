/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:51:44
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 01:55:44
 * @ Description: Vocabulary model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
} from 'sequelize-typescript';
import Lesson from './lesson.model';
import LessonVocabulary from './many-many/lesson-vocabulary.model';

@Table({
    tableName: 'vocabulary',
    timestamps: true,
})
export default class Vocabulary extends Model<Vocabulary> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'vocabulary_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_name',
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_meaning',
        allowNull: false,
        defaultValue: 'No meaning',
    })
    description!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_pronounce',
        allowNull: false,
        defaultValue: 'No pronounce',
    })
    pronounce!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'vocabulary_example',
        allowNull: false,
        defaultValue: 'No example',
    })
    example!: string;

    //? Relationships
    //! With lesson
    @BelongsToMany(() => Lesson, () => LessonVocabulary)
    lessons!: Lesson[];
}