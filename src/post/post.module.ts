import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
