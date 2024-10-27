import {
    CreateGrammarMapper,
    UpdateGrammarMapper,
} from '../mapper/grammar.mapper';
import GrammarService from '../services/grammar.service';
import { Request, Response } from 'express';
import {
    CODE_CREATED,
    CODE_ERR,
    CODE_ERR_NOT_FOUND,
    CODE_NO_CONTENT,
    CODE_SUCCESS,
    MESSAGE_CREATED,
    MESSAGE_DELETED,
    MESSAGE_ERR,
    MESSAGE_ERR_CREATE,
    MESSAGE_ERR_NOT_FOUND,
    MESSAGE_ERR_UPDATE,
    MESSAGE_SUCCESS,
    MESSAGE_UPDATED,
} from '../utils/constants.util';
import { CreateGrammarDTO, UpdateGrammarDTO } from '../dtos/grammar.dto';

class GrammarController {
    // inject grammar service
    private readonly grammarService: GrammarService;
    // inject grammar mapper
    private readonly createGrammarMapper: CreateGrammarMapper;
    private readonly updateGrammarMapper: UpdateGrammarMapper;

    constructor() {
        this.grammarService = new GrammarService();
        this.createGrammarMapper = new CreateGrammarMapper();
        this.updateGrammarMapper = new UpdateGrammarMapper();
    }

    // get list grammar
    async listGrammar(req: Request, res: Response) {
        const name = req.query.name as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.grammarService.getTotalsRecords();
            const grammars = await this.grammarService.getAllGrammar(
                { name },
                limit,
                offset,
            );
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: grammars,
                totalRecords: totalRecords,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    // get detail grammar

    async getGrammarById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const grammar = await this.grammarService.getGrammarById(id);
            if (!grammar) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'Grammar not found',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: grammar,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    // create new grammar
    async createGrammar(req: Request, res: Response) {
        const grammarDto = req.body as CreateGrammarDTO;
        const grammarModel = this.createGrammarMapper.toModel(grammarDto);
        try {
            const grammar =
                await this.grammarService.createGrammar(grammarModel);
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: grammar,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR_CREATE,
                data: error.message,
            });
        }
    }

    // update grammar
    async updateGrammar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const grammarDTO = req.body as UpdateGrammarDTO;
        const grammarModel = this.updateGrammarMapper.toModel(grammarDTO);
        try {
            const updatedGrammar = await this.grammarService.updateGrammar(
                id,
                grammarModel,
            );
            if (!updatedGrammar) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Grammar not found',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedGrammar,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    // delete grammar
    async deleteGrammar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const result = await this.grammarService.deleteGrammar(id);
            if (!result) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Grammar not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Grammar deleted',
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }
}

export default new GrammarController();
