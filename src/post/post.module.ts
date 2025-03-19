import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
