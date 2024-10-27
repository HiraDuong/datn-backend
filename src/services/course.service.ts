import { ListCourseDTO, CourseByIdDTO } from '../dtos/course.dto';
import { CourseByIdMapper, ListCourseMapper } from '../mapper/course.mapper';
import Course from '../models/postgresql/course.model';
import CourseRepository from '../repositories/course.repostory';
import { CourseModel, CourseSearchTerm } from '../types/course.type';

class CourseService {
    // inject course repositories
    private readonly courseRepository: CourseRepository;
    // inject course mapper
    private readonly listCourseMapper: ListCourseMapper;
    private readonly courseByIdMapper: CourseByIdMapper;
    constructor() {
        this.courseRepository = new CourseRepository();
        this.listCourseMapper = new ListCourseMapper();
        this.courseByIdMapper = new CourseByIdMapper();
    }

    // create a new course
    async createCourse(course: CourseModel): Promise<Course> {
        try {
            return await this.courseRepository.create({
                id: course.id,
                name: course.name,
                description: course.description,
                duration: course.duration,
                avatar: course.avatar ?? '',
            });
        } catch (error) {
            throw new Error(error + 'Failed to create course');
        }
    }

    // list course
    async getAllCourses(
        searchTerm: CourseSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<ListCourseDTO[]> {
        try {
            const courses = await this.courseRepository.getAll(
                searchTerm,
                limit,
                offset,
            );
            return this.listCourseMapper.toDTOs(courses);
        } catch (error) {
            throw new Error(error + 'Failed to get courses');
        }
    }

    // get course by id
    async getCourseById(id: number): Promise<CourseByIdDTO | null> {
        try {
            const course = await this.courseRepository.getById(id);
            console.log('course', course);
            if (course) {
                return this.courseByIdMapper.toDTO(course);
            } else {
                throw new Error('Course not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to get course by id');
        }
    }
    // update course by id
    async updateCourse(
        id: number,
        course: Partial<Course>,
    ): Promise<CourseByIdDTO | null> {
        try {
            const updatedCourse = await this.courseRepository.update(
                id,
                course,
            );
            if (updatedCourse) {
                return this.courseByIdMapper.toDTO(updatedCourse);
            } else {
                throw new Error('Course not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update course by id');
        }
    }

    // delete course by id
    async deleteCourse(id: number): Promise<boolean> {
        try {
            const deletedCourse = await this.courseRepository.delete(id);
            if (deletedCourse) {
                return true;
            } else {
                throw new Error('Course not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to delete course by id');
        }
    }

    async getTotalRecords(): Promise<number> {
        return await this.courseRepository.getTotalRecords();
    }
}

export default CourseService;
