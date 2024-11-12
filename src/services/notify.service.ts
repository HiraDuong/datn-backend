import { NotifyModel, NotifySearchTerm } from '../types/notify.type';
import {  NotifyByIdDTO, NotifyListDTO } from '../dtos/notify.dto';
import {  NotifyByIdMapper } from '../mapper/notify.mapper';
import NotifyRepository from '../repositories/notify.repository';
import Notify from '../models/postgresql/notify.model';

class NotifyService {
    private readonly notifyRepository: NotifyRepository;
    private readonly notifyByIdMapper: NotifyByIdMapper;

    constructor() {
        this.notifyRepository = new NotifyRepository();
        this.notifyByIdMapper = new NotifyByIdMapper();
    }

    // create a new notification
    async createNotify(notify: NotifyModel): Promise<Notify> {
        try {
            return await this.notifyRepository.create(notify);
        } catch (error) {
            throw new Error(error + 'Failed to create notification');
        }
    }

    // list notifications
    async getAllNotifies(searchTerm: NotifySearchTerm, limit: number = 10, offset: number = 0): Promise<NotifyListDTO[]> {
        try {
            const notifies = await this.notifyRepository.getAll(searchTerm, limit, offset);
            return notifies.map((notify) => this.notifyByIdMapper.toDTO(notify));
        } catch (error) {
            throw new Error(error + 'Failed to get notifications');
        }
    }

    // get notification by id
    async getNotifyById(id: number): Promise<NotifyByIdDTO | null> {
        try {
            const notify = await this.notifyRepository.getById(id);
            if (notify) {
                return this.notifyByIdMapper.toDTO(notify);
            } else {
                throw new Error('Notification not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to get notification by id');
        }
    }

    // update notification by id
    async updateNotify(id: number, notify: Partial<NotifyModel>): Promise<NotifyByIdDTO | null> {
        try {
            const updatedNotify = await this.notifyRepository.update(id, notify);
            if (updatedNotify) {
                return this.notifyByIdMapper.toDTO(updatedNotify);
            } else {
                throw new Error('Notification not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update notification by id');
        }
    }

    // delete notification by id
    async deleteNotify(id: number): Promise<boolean> {
        try {
            const deletedNotify = await this.notifyRepository.delete(id);
            return deletedNotify;
        } catch (error) {
            throw new Error(error + 'Failed to delete notification by id');
        }
    }

    // get total records
    async getTotalRecords(): Promise<number> {
        return await this.notifyRepository.getTotalRecords();
    }
}

export default NotifyService;
