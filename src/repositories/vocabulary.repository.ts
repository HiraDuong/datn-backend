import { Op } from 'sequelize';
import Vocabulary from '../models/postgresql/vocabulary.model';
import {
    VocabularyModel,
    VocabularySearchTerm,
} from '../types/vocabulary.type';

interface IVocabularyRepository {
    create(vocabulary: VocabularyModel): Promise<Vocabulary>;
    getAll(
        searchTerm: VocabularySearchTerm,
        limit: number,
        offset: number,
    ): Promise<Vocabulary[]>;
    getById(id: number): Promise<Vocabulary | null>;
    update(id: number, vocabulary: Vocabulary): Promise<Vocabulary | null>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class VocabularyRepository implements IVocabularyRepository {


    async create(vocabulary: VocabularyModel): Promise<Vocabulary> {
        try {
            return await Vocabulary.create({
                word: vocabulary.word,
                meaning: vocabulary.meaning,
                pronunciation: vocabulary.pronunciation,
                example: vocabulary.example,
                image: vocabulary.image, // Thêm thuộc tính image nếu cần
            });
        } catch (error) {
            throw new Error('Failed to create vocabulary: ' + error);
        }
    }

   async getAll(
    searchTerm: VocabularySearchTerm,
    limit: number = 10,
    offset: number = 0,
): Promise<Vocabulary[]> {
    try {
        const where: any = {};
        if (searchTerm.word) {
            where.word = { [Op.iLike]: `%${searchTerm.word}%` };
        }

        // Chỉ thêm limit và offset nếu chúng là số hợp lệ
        const conditions: any = {
            where,
            ...(limit ? { limit } : {}),
            ...(offset ? { offset } : {}),
        };

        return await Vocabulary.findAll(conditions);
    } catch (error) {
        throw new Error('Failed to get vocabularies: ' + error);
    }
}


    async getById(id: number): Promise<Vocabulary | null> {
        try {
            return await Vocabulary.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get vocabulary by id: ' + error);
        }
    }

    async update(
        id: number,
        vocabulary: Partial<Vocabulary>,
    ): Promise<Vocabulary | null> {
        try {
            const existingVocabulary = await Vocabulary.findByPk(id);
            if (!existingVocabulary) {
                throw new Error('Vocabulary not found');
            }
            return await existingVocabulary.update({
                word: vocabulary.word,
                meaning: vocabulary.meaning,
                example: vocabulary.example,
            });
        } catch (error) {
            throw new Error('Failed to update vocabulary: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingVocabulary = await Vocabulary.findByPk(id);
            if (!existingVocabulary) {
                throw new Error('Vocabulary not found');
            }
            await existingVocabulary.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete vocabulary: ' + error);
        }
    }
    async getTotalRecords(): Promise<number> {
        return Vocabulary.count();
    }
}

export default VocabularyRepository;
