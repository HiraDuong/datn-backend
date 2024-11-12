import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
    DataType,
} from 'sequelize-typescript';

import Lesson from '../lesson.model';
import Vocabulary from '../vocabulary.model';
import { LessonVocabularyModel } from '../../../types/many-many/lesson-vocabuary.type';

@Table({ tableName: 'lesson_vocabulary' })
export default class LessonVocabulary extends Model<LessonVocabularyModel> {
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
