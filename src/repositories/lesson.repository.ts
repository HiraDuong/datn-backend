import { Op } from 'sequelize';
import Lesson from '../models/postgresql/lesson.model';
import { LessonModel, LessonSearchTerm } from '../types/lesson.type';

interface ILessonRepository {
    create(lesson: Lesson): Promise<Lesson>;
    getAll(
        searchTerm: LessonSearchTerm,
        limit: number,
        offset: number,
    ): Promise<Lesson[]>;
    getById(id: number): Promise<Lesson | null>;
    update(id: number, lesson: Lesson): Promise<Lesson | null>;
    delete(id: number): Promise<boolean>;
}

class LessonRepository implements ILessonRepository {
    async create(lesson: LessonModel): Promise<Lesson> {
        try {
            return await Lesson.create({
                name: lesson.name,
                description: lesson.description,
                duration: lesson.duration,
                number: lesson.number,
                courseId: lesson.courseId,
            });
        } catch (error) {
            throw new Error(error + 'Failed to create lesson');
        }
    }
    async getAll(
        searchTerm: LessonSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<Lesson[]> {
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
            conditions.order = [['number', 'ASC']];
            return await Lesson.findAll(conditions);
        } catch (error) {
            throw new Error(error + 'Failed to get lessons');
        }
    }
    async getById(id: number): Promise<Lesson | null> {
        try {
            return await Lesson.findByPk(id,{
                include: ['tasks',  'vocabulary', 'grammar' ] // Include nhiều bảng liên kết
            });
        } catch (error) {
            throw new Error(error + 'Failed to get lesson');
        }
    }
    async update(id: number, lesson: Partial<Lesson>): Promise<Lesson | null> {
        try {
            const existingLesson = await Lesson.findByPk(id);
            if (!existingLesson) {
                throw new Error('Lesson not found');
            }
            await existingLesson.update(lesson);
            return existingLesson;
        } catch (error) {
            throw new Error(error + 'Failed to update lesson');
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const existingLesson = await Lesson.findByPk(id);
            if (!existingLesson) {
                return false;
            }
            await existingLesson.destroy(); // Xóa thành công
            return true;
        } catch (error) {
            throw new Error(error + 'Failed to delete lesson');
        }
    }
}

export default LessonRepository;
