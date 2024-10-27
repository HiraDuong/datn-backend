
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
import { LessonGrammarModel } from '../../../types/many-many/lesson-grammar.type';

@Table({ tableName: 'lesson_grammar' })
export default class LessonGrammar extends Model<LessonGrammarModel> {
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
