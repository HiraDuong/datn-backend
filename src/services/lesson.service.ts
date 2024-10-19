import { LessonByIdDTO, ListLessonDTO } from '../dtos/lesson.dto';
import { LessonByIdMapper, ListLessonMapper } from '../mapper/lesson.mapper';
import Lesson from '../models/postgresql/lesson.model';
import LessonRepository from '../repositories/lesson.repository';
import { LessonModel, LessonSearchTerm } from '../types/lesson.type';

class LessonService {
    // inject lesson repositories
    private readonly lessonRepository: LessonRepository;
    private readonly listLessonMapper: ListLessonMapper;
    private readonly lessonByIdMapper: LessonByIdMapper;
    constructor() {
        this.lessonRepository = new LessonRepository();
        this.listLessonMapper = new ListLessonMapper();
        this.lessonByIdMapper = new LessonByIdMapper();
    }

    // create a new lesson
    async createLesson(lesson: LessonModel): Promise<Lesson> {
        try {
            return await this.lessonRepository.create({
                id: lesson.id,
                name: lesson.name,
                description: lesson.description,
                duration: lesson.duration,
                number: lesson.number,
                courseId: lesson.courseId,
            });
        } catch (error) {
            throw new Error('Failed to create lesson: ' + error);
        }
    }

    // list lessons
    async getAllLessons(
        searchTerm: LessonSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<ListLessonDTO[]> {
        try {
            const lessons = await this.lessonRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.listLessonMapper.toDTOs(lessons);
        } catch (error) {
            throw new Error('Failed to get lessons: ' + error);
        }
    }

    // get lesson by id
    async getLessonById(id: number): Promise<LessonByIdDTO | null> {
        try {
            const lesson = await this.lessonRepository.getById(id);
            if (!lesson) {
                throw new Error('Lesson not found');
            }
            return this.lessonByIdMapper.toDTO(lesson);
        } catch (error) {
            throw new Error('Failed to get lesson by id: ' + error);
        }
    }
    // update lesson

    async updateLesson(
        id: number,
        lesson: Partial<LessonModel>,
    ): Promise<LessonByIdDTO | null> {
        try {
            const updatedLesson = await this.lessonRepository.update(
                id,
                lesson,
            );
            if (!updatedLesson) {
                throw new Error('Lesson not found');
            }
            return this.lessonByIdMapper.toDTO(updatedLesson);
        } catch (error) {
            throw new Error('Failed to update lesson by id: ' + error);
        }
    }

    async deleteLesson(id: number): Promise<boolean> {
        try {
            const result = await this.lessonRepository.delete(id);
            if (!result) {
                throw new Error('Lesson not found');
            }
            return true; // Xóa thành công
        } catch (error) {
            throw new Error('Failed to delete lesson by id: ' + error);
        }
    }
}

export default LessonService;
