import { GrammarByIdDTO, ListGrammarDTO } from '../dtos/grammar.dto';
import { ListGrammarMapper, GrammarByIdMapper } from '../mapper/grammar.mapper';
import Grammar from '../models/postgresql/grammar.model';
import GrammarRepository from '../repositories/grammar.repository';
import { GrammarModel, GrammarSearchTerm } from '../types/grammar.type';

class GrammarService {
    // inject grammar repositories
    private readonly grammarRepository: GrammarRepository;
    // inject grammar mapper
    private readonly listGrammarMapper: ListGrammarMapper;
    private readonly GrammarByIdMapper: GrammarByIdMapper;
    constructor() {
        this.grammarRepository = new GrammarRepository();
        this.listGrammarMapper = new ListGrammarMapper();
        this.GrammarByIdMapper = new GrammarByIdMapper();
    }

    // Tao ngữ pháp mới
    async createGrammar(grammar: GrammarModel): Promise<Grammar> {
        try {
            return await this.grammarRepository.create(grammar);
        } catch (error) {
            throw new Error('Failed to create grammar:' + error);
        }
    }

    // Lay danh sach ngữ pháp
    async getAllGrammar(
        searchTerm: GrammarSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<ListGrammarDTO[]> {
        try {
            const grammars = await this.grammarRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.listGrammarMapper.toListDTO(grammars);
        } catch (error) {
            throw new Error(error + 'Failed to get grammars');
        }
    }

    // Lay ngữ pháp theo id
    async getGrammarById(id: number): Promise<GrammarByIdDTO> {
        try {
            const grammar = await this.grammarRepository.getById(id);
            if (!grammar) {
                throw new Error('Grammar not found');
            }
            return this.GrammarByIdMapper.toDTO(grammar);
        } catch (error) {
            throw new Error('Failed to get grammar: ' + error);
        }
    }

    // Cap nhat ngữ pháp
    async updateGrammar(
        id: number,
        grammar: Partial<GrammarModel>,
    ): Promise<GrammarByIdDTO | null> {
        try {
            const updatedGrammar = await this.grammarRepository.update(
                id,
                grammar,
            );
            if (updatedGrammar) {
                return this.GrammarByIdMapper.toDTO(updatedGrammar);
            } else {
                throw new Error('Grammar not found');
            }
        } catch (error) {
            throw new Error('Failed to update grammar: ' + error);
        }
    }

    // Xoa ngữ pháp theo id
    async deleteGrammar(id: number): Promise<boolean> {
        try {
            return await this.grammarRepository.delete(id);
        } catch (error) {
            throw new Error('Failed to delete grammar: ' + error);
        }
    }
}
export default GrammarService;
