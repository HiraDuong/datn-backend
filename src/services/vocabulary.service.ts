import { ListVocabularyDTO, VocabularyByIdDTO } from '../dtos/vocabulary.dto';
import {
    ListVocabularyMapper,
    VocabularyByIdMapper,
} from '../mapper/vocabulary.mapper';
import Vocabulary from '../models/postgresql/vocabulary.model';
import VocabularyRepository from '../repositories/vocabulary.repository';
import {
    VocabularyModel,
    VocabularySearchTerm,
} from '../types/vocabulary.type';

class VocabularyService {
    // inject vocabulary repositories
    private readonly vocabularyRepository: VocabularyRepository;
    // inject vocabulary mapper
    private readonly listVocabularyMapper: ListVocabularyMapper;
    private readonly vocabularyByIdMapper: VocabularyByIdMapper;
    constructor() {
        this.vocabularyRepository = new VocabularyRepository();
        this.listVocabularyMapper = new ListVocabularyMapper();
        this.vocabularyByIdMapper = new VocabularyByIdMapper();
    }

    // get all vocabularies
    async getAllVocabularies(
        searchTerm: VocabularySearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<ListVocabularyDTO[]> {
        try {
            const vocabularies = await this.vocabularyRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.listVocabularyMapper.toDTOs(vocabularies);
        } catch (error) {
            throw new Error(error + 'Failed to get vocabularies');
        }
    }
    // get vocabulary by id
    async getVocabularyById(id: number): Promise<VocabularyByIdDTO | null> {
        try {
            const vocabulary = await this.vocabularyRepository.getById(id);
            if (vocabulary) {
                return this.vocabularyByIdMapper.toDTO(vocabulary);
            } else {
                throw new Error('Vocabulary not found');
            }
        } catch (error) {
            throw new Error('Failed to get vocabulary by id: ' + error);
        }
    }
    // create new vocabulary
    async createVocabulary(
        vocabulary: VocabularyModel,
    ): Promise<VocabularyByIdDTO> {
        try {
            return await this.vocabularyRepository.create(vocabulary);
        } catch (error) {
            throw new Error(error + 'Failed to create vocabulary');
        }
    }
    // update vocabulary
    async updateVocabulary(
        id: number,
        vocabulary: Partial<VocabularyModel>,
    ): Promise<VocabularyByIdDTO | null> {
        try {
            const updatedVocabulary = await this.vocabularyRepository.update(
                id,
                vocabulary,
            );
            if (updatedVocabulary) {
                return this.vocabularyByIdMapper.toDTO(updatedVocabulary);
            } else {
                throw new Error('Vocabulary not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update vocabulary');
        }
    }
    // delete vocabulary
    async deleteVocabulary(id: number): Promise<boolean> {
        try {
            return await this.vocabularyRepository.delete(id);
        } catch (error) {
            throw new Error(error + 'Failed to delete vocabulary');
        }
    }
}

export default VocabularyService;
