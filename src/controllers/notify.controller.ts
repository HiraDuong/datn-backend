/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-19 00:46:27
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 17:15:44
 * @ Description: Notify Controller
 */
import { Request, Response } from 'express';

import NotifyService from '../services/notify.service';
import { CreateNotifyDTO, UpdateNotifyDTO } from '../dtos/notify.dto';
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
    CreateNotifyMapper,
    UpdateNotifyMapper,
} from '../mapper/notify.mapper';

class NotifyController {
    private readonly notifyService: NotifyService;
    private readonly updateNotifyMapper: UpdateNotifyMapper;
    private readonly createNotifyMapper: CreateNotifyMapper;
    constructor() {
        this.notifyService = new NotifyService();
        this.updateNotifyMapper = new UpdateNotifyMapper();
        this.createNotifyMapper = new CreateNotifyMapper();
    }

    async listNotifications(req: Request, res: Response) {
        const searchTerm = req.query.searchTerm as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        try {
            const totalRecords = await this.notifyService.getTotalRecords();
            const notifications = await this.notifyService.getAllNotifications(
                { searchTerm },
                limit,
                offset,
            );
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: notifications,
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

    async getNotificationById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const notification = await this.notifyService.getNotificationById(id);
            if (!notification) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Notification not found',
                });
            }
            const response = {
                code: CODE_SUCCESS,
                message: MESSAGE_SUCCESS,
                data: notification,
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

    async createNotify(req: Request, res: Response) {
        const { content, userId } = req.body;
        const createNotifyDTO: CreateNotifyDTO = {
            content,
            userId,
        };
        const notification = this.createNotifyMapper.toModel(createNotifyDTO);

        try {
            const createdNotification = await this.notifyService.createNotify(notification);
            if (!createdNotification) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_CREATE,
                    data: 'Notification creation failed',
                });
            }
            return res.status(200).json({
                code: CODE_CREATED,
                message: MESSAGE_CREATED,
                data: createdNotification,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async updateNotify(req: Request, res: Response) {
        const id = req.params.id;
        const { content } = req.body;
        const updateNotifyDTO: UpdateNotifyDTO = {
            content,
        };
        const notification = this.updateNotifyMapper.toModel(updateNotifyDTO);

        try {
            const updatedNotification = await this.notifyService.updateNotify(parseInt(id), notification);
            if (!updatedNotification) {
                return res.status(200).json({
                    code: CODE_ERR,
                    message: MESSAGE_ERR_UPDATE,
                    data: 'Notification update failed',
                });
            }
            return res.status(200).json({
                code: CODE_SUCCESS,
                message: MESSAGE_UPDATED,
                data: updatedNotification,
            });
        } catch (error: any) {
            return res.status(200).json({
                code: CODE_ERR,
                message: MESSAGE_ERR,
                data: error.message,
            });
        }
    }

    async deleteNotify(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const deletedNotification = await this.notifyService.deleteNotify(id);
            if (!deletedNotification) {
                return res.status(200).json({
                    code: CODE_ERR_NOT_FOUND,
                    message: MESSAGE_ERR_NOT_FOUND,
                    data: 'Notification not found',
                });
            }
            return res.status(200).json({
                code: CODE_NO_CONTENT,
                message: MESSAGE_DELETED,
                data: 'Notification deleted successfully',
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

export default new NotifyController();
