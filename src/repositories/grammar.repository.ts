import { Op } from 'sequelize';
import Grammar from '../models/postgresql/grammar.model';
import { GrammarModel, GrammarSearchTerm } from '../types/grammar.type';
interface IGrammarRepository {
    create(grammar: GrammarModel): Promise<Grammar>;
    getAll(
        searchTerm: GrammarSearchTerm,
        limit: number,
        offset: number,
    ): Promise<Grammar[]>;
    getById(id: number): Promise<Grammar | null>;
    update(id: number, grammar: Grammar): Promise<Grammar | null>;
    delete(id: number): Promise<boolean>;
}

class GrammarRepository implements IGrammarRepository {
    async create(grammar: GrammarModel): Promise<Grammar> {
        try {
            return await Grammar.create({
                name: grammar.name,
                description: grammar.description,
                example: grammar.example,
            });
        } catch (error) {
            throw new Error(error + 'Failed to create grammar');
        }
    }
    async getAll(
        searchTerm: GrammarSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<Grammar[]> {
        try {
            const where: any = {};
            if (searchTerm.name) {
                where.name = { [Op.iLike]: `%${searchTerm.name}%` };
            }
            const conditions: any = { where };
            if (limit) {
                conditions.limit = limit;
            }
            if (offset) {
                conditions.offset = offset;
            }
            return await Grammar.findAll(conditions);
        } catch (error) {
            throw new Error(error + 'Failed to get grammars');
        }
    }
    async getById(id: number): Promise<Grammar | null> {
        try {
            return await Grammar.findByPk(id);
        } catch (error) {
            throw new Error(error + 'Failed to get grammar');
        }
    }
    async update(
        id: number,
        grammar: Partial<Grammar>,
    ): Promise<Grammar | null> {
        try {
            const existingGrammar = await Grammar.findByPk(id);
            if (!existingGrammar) {
                return null;
            }
            return await existingGrammar.update(grammar);
        } catch (error) {
            throw new Error(error + 'Failed to update grammar');
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const existingGrammar = await Grammar.findByPk(id);
            if (!existingGrammar) {
                return false;
            }
            await existingGrammar.destroy();
            return true;
        } catch (error) {
            throw new Error(error + 'Failed to delete grammar');
        }
    }
}

export default GrammarRepository;
