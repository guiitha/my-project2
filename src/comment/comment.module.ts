import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Comments } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
