/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 00:46:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 17:15:24
 * @ Description: Message Controller
 */
import { Request, Response } from 'express';

import MessageService from '../services/message.service';
import { CreateMessageDTO, UpdateMessageDTO } from '../dtos/message.dto';
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
import {
    CreateMessageMapper,
    UpdateMessageMapper,
} from '../mapper/message.mapper';

class MessageController {
    private readonly messageService: MessageService;
    private readonly updateMessageMapper: UpdateMessageMapper;
    private readonly createMessageMapper: CreateMessageMapper;
    constructor() {
        this.messageService = new MessageService();
        this.updateMessageMapper = new UpdateMessageMapper();
        this.createMessageMapper = new CreateMessageMapper();
    }

    async listMessages(req: Request, res: Response) {
        const searchTerm = req.query.searchTerm as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.messageService.getTotalRecords();
            const messages = await this.messageService.getAllMessages(
                { searchTerm },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: messages,
                totalRecords: totalRecords,
            };
            return res.status(200).json(response);
        } catch (error: any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async getMessageById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const message = await this.messageService.getMessageById(id);
            if (!message) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Message not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: message,
            };
            return res.status(200).json(response);
        } catch (error: any) {
            const response = {
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            };
            return res.status(200).json(response);
        }
    }

    async createMessage(req: Request, res: Response) {
        const { content, userId } = req.body;
        const createMessageDTO: CreateMessageDTO = {
            content,
            userId,
        };
        const message = this.createMessageMapper.toModel(createMessageDTO);

        try {
            const createdMessage = await this.messageService.createMessage(message);
            if (!createdMessage) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Message creation failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdMessage,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateMessage(req: Request, res: Response) {
        const id = req.params.id;
        const { content } = req.body;
        const updateMessageDTO: UpdateMessageDTO = {
            content,
        };
        const message = this.updateMessageMapper.toModel(updateMessageDTO);

        try {
            const updatedMessage = await this.messageService.updateMessage(parseInt(id), message);
            if (!updatedMessage) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Message update failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedMessage,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteMessage(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedMessage = await this.messageService.deleteMessage(id);
            if (!deletedMessage) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Message not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Message deleted successfully',
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

export default new MessageController();
