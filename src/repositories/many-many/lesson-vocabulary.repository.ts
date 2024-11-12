import LessonVocabulary from "../../models/postgresql/many-to-many/lesson-vocabulary.model";


interface ILessonVocabularyRepository {
    create(lessonId: number, vocabularyId: number): Promise<LessonVocabulary>;
    delete(lessonId: number, vocabularyId: number): Promise<boolean>;
}

class LessonVocabularyRepository implements ILessonVocabularyRepository {
    async create(lessonId: number, vocabularyId: number): Promise<LessonVocabulary> {
        try {
            return await LessonVocabulary.create({
                lessonId,
                vocabularyId,
            });
        } catch (error) {
            throw new Error('Failed to create lesson vocabulary: ' + error);
        }
    }

    async delete(lessonId: number, vocabularyId: number): Promise<boolean> {
        try {
            const existingEntry = await LessonVocabulary.findOne({
                where: {
                    lessonId,
                    vocabularyId,
                },
            });
            if (!existingEntry) {
                throw new Error('Entry not found');
            }
            await existingEntry.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete lesson vocabulary: ' + error);
        }
    }
}

export default LessonVocabularyRepository;
