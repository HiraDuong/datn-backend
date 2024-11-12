import {
    NotifyListDTO,
    NotifyByIdDTO,
    NotifyCreatedDTO,
    NotifyUpdatedDTO,
} from '../dtos/notify.dto';
import Notify from '../models/postgresql/notify.model';
import { NotifyModel } from '../types/notify.type';

export class NotifyListMapper {
    toDTO(notify: Notify): NotifyListDTO {
        return {
            id: notify.id,
            message: notify.message,
            userId: notify.userId,
            isRead: notify.isRead,
            createdAt: notify.createdAt,
            updatedAt: notify.updatedAt,
        };
    }

    toDTOs(notifies: Notify[]): NotifyListDTO[] {
        return notifies.map((notify) => this.toDTO(notify));
    }
}

export class NotifyByIdMapper {
    toDTO(notify: Notify): NotifyByIdDTO {
        return {
            id: notify.id,
            message: notify.message,
            userId: notify.userId,
            isRead: notify.isRead,
            createdAt: notify.createdAt,
            updatedAt: notify.updatedAt,
        };
    }
}

export class NotifyCreatedMapper {
    toModel(notifyDTO: NotifyCreatedDTO): NotifyModel {
        return {
            message: notifyDTO.message,
            userId: notifyDTO.userId,
            isRead: false,
        };
    }
}

export class NotifyUpdatedMapper {
    toModel(notifyDTO: NotifyUpdatedDTO): Partial<NotifyModel> {
        return {
            isRead: notifyDTO.isRead,
        };
    }
}
