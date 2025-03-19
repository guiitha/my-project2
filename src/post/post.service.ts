import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts)
        private readonly postRepository: MongoRepository<Posts>,
    ) {}

    async createPost(postData: Posts) {
        try {
            return await this.postRepository.save({
                topic: postData.topic,
                content: postData.content,
                createdBy: postData.createdBy,
                createdAt: new Date(),
            });
        } catch (error) {
            throw new HttpException(
                `Failed to create post: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
