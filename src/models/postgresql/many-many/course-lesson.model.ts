import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Course from '../course.model';
import Lesson from '../lesson.model';

@Table({ tableName: 'course_lesson' })
export default class CourseLesson extends Model<CourseLesson> {
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        field: 'course_id',
        allowNull: false,
    })
    courseId!: number;

    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER,
        field: 'lesson_id',
        allowNull: false,
    })
    lessonId!: number;

    @BelongsTo(() => Course, {
        foreignKey: 'course_id',
    })
    course!: Course;
    @BelongsTo(() => Lesson, {
        foreignKey: 'lesson_id',
    })
    lesson!: Lesson;
}
