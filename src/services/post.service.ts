import { PostByIdDTO, PostListDTO } from '../dtos/post.dto';
import { PostByIdMapper,  } from '../mapper/post.mapper';
import Post from '../models/postgresql/post.model';
import PostRepository from '../repositories/post.repository';
import { PostModel, PostSearchTerm } from '../types/post.type';

class PostService {
    private readonly postRepository: PostRepository;
    private readonly postByIdMapper: PostByIdMapper;

    constructor() {
        this.postRepository = new PostRepository();
        this.postByIdMapper = new PostByIdMapper();
    }

    async createPost(post: PostModel): Promise<Post> {
        try {
            return await this.postRepository.create(post);
        } catch (error) {
            throw new Error(error + 'Failed to create post');
        }
    }

    async getAllPosts(
        searchTerm: PostSearchTerm,
        limit: number = 10,
        offset: number = 0,
    ): Promise<PostListDTO[]> {
        try {
            const posts = await this.postRepository.getAll(searchTerm, limit, offset);
            return posts.map((post) => this.postByIdMapper.toDTO(post));
        } catch (error) {
            throw new Error(error + 'Failed to get posts');
        }
    }

    async getPostById(id: number): Promise<PostByIdDTO | null> {
        try {
            const post = await this.postRepository.getById(id);
            if (post) {
                return this.postByIdMapper.toDTO(post);
            } else {
                throw new Error('Post not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to get post by id');
        }
    }

    async updatePost(id: number, post: Partial<Post>): Promise<PostByIdDTO | null> {
        try {
            const updatedPost = await this.postRepository.update(id, post);
            if (updatedPost) {
                return this.postByIdMapper.toDTO(updatedPost);
            } else {
                throw new Error('Post not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update post by id');
        }
    }

    async deletePost(id: number): Promise<boolean> {
        try {
            const deletedPost = await this.postRepository.delete(id);
            if (deletedPost) {
                return true;
            } else {
                throw new Error('Post not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to delete post by id');
        }
    }

    async getTotalRecords(): Promise<number> {
        return await this.postRepository.getTotalRecords();
    }
}

export default PostService;
