import {
    CreateVocabularyMapper,
    UpdateVocabularyMapper,
} from '../mapper/vocabulary.mapper';
import VocabularyService from '../services/vocabulary.service';
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
    MESSAGE_ERR_NOT_FOUND,
    MESSAGE_SUCCESS,
    MESSAGE_UPDATED,
} from '../utils/constants.util';
import {
    CreateVocabularyDTO,
    UpdateVocabularyDTO,
} from '../dtos/vocabulary.dto';
class VocabularyController {
    // inject vocabulary service
    private readonly vocabularyService: VocabularyService;
    // inject vocabulary mapper
    private readonly createVocabularyMapper: CreateVocabularyMapper;
    private readonly updateVocabularyMapper: UpdateVocabularyMapper;

    constructor() {
        this.vocabularyService = new VocabularyService();
        this.createVocabularyMapper = new CreateVocabularyMapper();
        this.updateVocabularyMapper = new UpdateVocabularyMapper();
    }

    async listVocabulary(req: Request, res: Response) {
        const word = req.query.word as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const vocabularies =
                await this.vocabularyService.getAllVocabularies(
                    { word },
                    limit,
                    offset,
                );
            // Lấy tổng số bản ghi trong db (phục vụ phân trang)
            const totalRecords = await this.vocabularyService.getTotalRecords();
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: vocabularies,
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

    async getVocabularyById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const vocabulary =
                await this.vocabularyService.getVocabularyById(id);
            if (!vocabulary) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Vocabulary not found',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: vocabulary,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async createVocabulary(req: Request, res: Response) {
        const createVocabularyDTO = req.body as CreateVocabularyDTO;
        try {
            const createVocabularyModel =
                this.createVocabularyMapper.toModel(createVocabularyDTO);
            const createVocabulary =
                await this.vocabularyService.createVocabulary(
                    createVocabularyModel,
                );
            if (!createVocabulary) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR,
                    data: 'Failed to create vocabulary',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: 'Vocabulary created successfully',
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateVocabulary(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updateVocabularyDTO = req.body as UpdateVocabularyDTO;
        try {
            const updateVocabularyModel =
                this.updateVocabularyMapper.toModel(updateVocabularyDTO);
            const updatedVocabulary =
                await this.vocabularyService.updateVocabulary(
                    id,
                    updateVocabularyModel,
                );
            if (!updatedVocabulary) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Vocabulary not found',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: 'Vocabulary updated successfully',
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteVocabulary(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deleted = await this.vocabularyService.deleteVocabulary(id);
            if (!deleted) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Vocabulary not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Vocabulary deleted successfully',
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

export default new VocabularyController();
