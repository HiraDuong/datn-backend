
import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Users from './user.model';
import { PostModel } from '../../types/post.type';


@Table({
    tableName: 'posts',
    timestamps: true,
})
export default class Post extends Model<PostModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'post_id',
    })
    id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId!: number;

    @Column({
        type: DataType.STRING(500),
        field: 'post_content',
        allowNull: false,
    })
    content!: string;

    @Column({
        type: DataType.STRING(255),
        field: 'post_image',
        allowNull: true,
    })
    image?: string;

    @BelongsTo(() => Users)
    user!: Users;
}
