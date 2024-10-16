/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 01:58:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:00:28
 * @ Description: Trung gian giữa lesson và grammar
 */

import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Lesson from '../lesson.model';
import Grammar from '../grammar.model';

@Table({ tableName: 'lesson_grammar' })
export default class LessonGrammar extends Model<LessonGrammar> {
    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER,
        field: 'lesson_id',
        allowNull: false,
    })
    lessonId!: number;

    @ForeignKey(() => Grammar)
    @Column({
        type: DataType.INTEGER,
        field: 'grammar_id',
        allowNull: false,
    })
    grammarId!: number;

    @BelongsTo(() => Lesson, { foreignKey: 'lesson_id' })
    lesson!: Lesson;

    @BelongsTo(() => Grammar, { foreignKey: 'grammar_id' })
    grammar!: Grammar;
}
