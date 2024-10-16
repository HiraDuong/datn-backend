/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 01:54:32
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 02:19:22
 * @ Description: Trung gian giữa lesson và vocabulary
 */

import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Lesson from '../lesson.model';
import Vocabulary from '../vocabulary.model';

@Table({ tableName: 'lesson_vocabulary' })
export default class LessonVocabulary extends Model<LessonVocabulary> {
    @ForeignKey(() => Lesson)
    @Column({ field: 'lesson_id' })
    lessonId!: number;

    @ForeignKey(() => Vocabulary)
    @Column({ field: 'vocabulary_id' })
    vocabularyId!: number;

    @BelongsTo(() => Lesson)
    lesson?: Lesson;

    @BelongsTo(() => Vocabulary)
    vocabulary?: Vocabulary;
}
