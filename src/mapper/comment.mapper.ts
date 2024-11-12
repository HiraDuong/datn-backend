import {
    CommentDTO,
    CreateCommentDTO,
    UpdateCommentDTO,
} from '../dtos/comment.dto';
import Comment from '../models/postgresql/comment.model';
import { CommentModel } from '../types/comment.type';

export class CommentListMapper {
    toDTO(comment: Comment): CommentDTO {
        return {
            id: comment.id,
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId,
           
        };
    }

    toDTOs(comments: Comment[]): CommentDTO[] {
        return comments.map((comment) => this.toDTO(comment));
    }
}

export class CommentByIdMapper {
    toDTO(comment: Comment): CommentDTO {
        return {
            id: comment.id,
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId,

        };
    }
}

export class CommentCreatedMapper {
    toModel(commentDTO: CreateCommentDTO): CommentModel {
        return {
            content: commentDTO.content,
            postId: commentDTO.postId,
            userId: commentDTO.userId,
        };
    }
}

export class CommentUpdatedMapper {
    toModel(commentDTO: UpdateCommentDTO): Partial<CommentModel> {
        return {
            content: commentDTO.content,
        };
    }
}
