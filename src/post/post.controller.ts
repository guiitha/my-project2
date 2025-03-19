import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { Authorize } from 'src/authorize.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('createPost')
    @UseGuards(Authorize)
    async createPost(@Body() postData: Posts) {
        const post = await this.postService.createPost(postData);
        return post;
    }
}
