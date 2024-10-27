/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:55:33
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-24 02:47:05
 * @ Description: Grammar model
 */

import {
    Column,
    DataType,
    Table,
    Model,
    BelongsToMany,
} from 'sequelize-typescript';
import Lesson from './lesson.model';
import LessonGrammar from './many-many/lesson-grammar.model';
import { GrammarModel } from '../../types/grammar.type';

@Table({
    tableName: 'grammar',
    timestamps: true,
})
export default class Grammar extends Model<GrammarModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'grammar_id',
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'grammar_name',
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'grammar_rule',
        allowNull: false,
        defaultValue: 'No rule',
    })
    rule!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'grammar_example',
        allowNull: false,
        defaultValue: 'No example',
    })
    example!: string;

    //? Relationships
    //! With lesson
    @BelongsToMany(() => Lesson, () => LessonGrammar)
    lessons!: Lesson[];
}
