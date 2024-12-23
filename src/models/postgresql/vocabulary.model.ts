/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:51:44
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-25 22:38:27
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
import LessonVocabulary from './many-to-many/lesson-vocabulary.model';
import { VocabularyModel } from '../../types/vocabulary.type';

@Table({
    tableName: 'vocabulary',
    timestamps: true,
})
export default class Vocabulary extends Model<VocabularyModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'vocabulary_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_word',
        allowNull: false,
    })
    word!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_meaning',
        allowNull: false,
        defaultValue: 'No meaning',
    })
    meaning!: string;

    @Column({
        type: DataType.STRING(100),
        field: 'vocabulary_pronounce',
        allowNull: false,
        defaultValue: 'No pronounce',
    })
    pronunciation!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'vocabulary_example',
        allowNull: false,
        defaultValue: 'No example',
    })
    example!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'vocabulary_image',
        allowNull: false,
        defaultValue: 'No image',
    })
    image!: string;
    //? Relationships
    //! With lesson
    @BelongsToMany(() => Lesson, () => LessonVocabulary)
    lessons!: Lesson[];
}
