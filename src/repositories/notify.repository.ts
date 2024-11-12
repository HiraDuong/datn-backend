/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-17 00:39:28
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-11-12 16:52:42
 * @ Description: Notify Repository
 */

import { NotifyModel, NotifySearchTerm } from '../types/notify.type';
import Notify from '../models/postgresql/notify.model';
import { Op } from 'sequelize';

interface INotifyRepository {
    create(notify: NotifyModel): Promise<Notify>;
    getAll(searchTerm: NotifySearchTerm, limit: number, offset: number): Promise<Notify[]>;
    getById(id: number): Promise<Notify | null>;
    update(id: number, notify: Partial<NotifyModel>): Promise<Notify | null>;
    delete(id: number): Promise<boolean>;
    getTotalRecords(): Promise<number>;
}

class NotifyRepository implements INotifyRepository {
    async getTotalRecords(): Promise<number> {
        return await Notify.count();
    }

    async create(notify: NotifyModel): Promise<Notify> {
        try {
            return await Notify.create(notify);
        } catch (error) {
            throw new Error('Failed to create notify: ' + error);
        }
    }

    async getAll(searchTerm: NotifySearchTerm, limit: number = 10, offset: number = 0): Promise<Notify[]> {
        try {
            const where: any = {};
            if (searchTerm.content) {
                where.content = { [Op.iLike]: `%${searchTerm.content}%` };
            }
            const conditions: any = { where };
            if (limit) conditions.limit = limit;
            if (offset) conditions.offset = offset;
            return await Notify.findAll(conditions);
        } catch (error) {
            throw new Error('Failed to get notifications: ' + error);
        }
    }

    async getById(id: number): Promise<Notify | null> {
        try {
            return await Notify.findByPk(id);
        } catch (error) {
            throw new Error('Failed to get notify: ' + error);
        }
    }

    async update(id: number, notify: Partial<NotifyModel>): Promise<Notify | null> {
        try {
            const existingNotify = await Notify.findByPk(id);
            if (!existingNotify) throw new Error('Notify not found');
            await existingNotify.update(notify);
            return existingNotify;
        } catch (error) {
            throw new Error('Failed to update notify: ' + error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existingNotify = await Notify.findByPk(id);
            if (!existingNotify) throw new Error('Notify not found');
            await existingNotify.destroy();
            return true;
        } catch (error) {
            throw new Error('Failed to delete notify: ' + error);
        }
    }
}

export default NotifyRepository;
