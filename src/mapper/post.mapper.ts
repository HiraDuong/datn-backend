import {
    PostListDTO,
    PostByIdDTO,
    PostCreatedDTO,
    PostUpdatedDTO,
} from '../dtos/post.dto';
import Post from '../models/postgresql/post.model';
import { PostModel } from '../types/post.type';

export class PostListMapper {
    toDTO(post: Post): PostListDTO {
        return {
            id: post.id,
            content: post.content,
            image: post.image,
            userId: post.userId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    toDTOs(posts: Post[]): PostListDTO[] {
        return posts.map((post) => this.toDTO(post));
    }
}

export class PostByIdMapper {
    toDTO(post: Post): PostByIdDTO {
        return {
            id: post.id,
            content: post.content,
            image: post.image,
            userId: post.userId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
}

export class PostCreatedMapper {
    toModel(postDTO: PostCreatedDTO): PostModel {
        return {
            content: postDTO.content,
            image: postDTO.image,
            userId: postDTO.userId,
        };
    }
}

export class PostUpdatedMapper {
    toModel(postDTO: PostUpdatedDTO): Partial<PostModel> {
        return {
            content: postDTO.content,
            image: postDTO.image,
        };
    }
}
