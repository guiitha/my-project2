import { Controller, Body, Post, UseGuards, Get, Delete, Put, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comments } from './comment.entity';
import { Authorize } from '../authorize.guard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('addComment')
    @UseGuards(Authorize)
    async createComment(@Body() commentData: Comments){
        const comment = await this.commentService.createComment(commentData);
        return comment;
    }

    @Get()
    async getAllComments() {
        const comment = await this.commentService.getAllComments();
        return comment;
    }

    @Get(':postId')
    async getCommentsByPostId(@Param('postId') postId: string) {
        console.log(postId);
        const comment = await this.commentService.getCommentsByPostId(postId);
        return comment;
    }


}
