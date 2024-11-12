
import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import Post from './post.model';
import Users from './user.model';
import { CommentModel } from '../../types/comment.type';

@Table({
    tableName: 'comments',
    timestamps: true,
})
export default class Comment extends Model<CommentModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'comment_id',
    })
    id!: number;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'post_id',
    })
    postId!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId!: number;

    @Column({
        type: DataType.STRING(500),
        field: 'comment_content',
        allowNull: false,
    })
    content!: string;

    @BelongsTo(() => Post)
    post!: Post;

    @BelongsTo(() => Users)
    user!: Users;
}
