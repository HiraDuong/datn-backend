import LessonGrammar from "../../models/postgresql/many-to-many/lesson-grammar.model";

interface ILessonGrammarRepository {
    create(lessonId: number, grammarId: number): Promise<LessonGrammar>;
    delete(lessonId: number, grammarId: number): Promise<boolean>;
}

class LessonGrammarRepository implements ILessonGrammarRepository {
    async create(lessonId: number, grammarId: number): Promise<LessonGrammar> {
        try {
            return await LessonGrammar.create({
                lessonId,
                grammarId,
            });
        } catch (error) {
            throw new Error('Failed to create lesson grammar: ' + error);
        }
    }

    async delete(lessonId: number, grammarId: number): Promise<boolean> {
        try {
            const existingEntry = await LessonGrammar.findOne({
                where: {
                    lessonId,
                    grammarId,
                },
            });
            if (!existingEntry) {
                throw new Error('Entry not found');
            }
            await existingEntry.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete lesson grammar: ' + error);
        }
    }
}

export default LessonGrammarRepository;
