import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://wwwguitha:8efOVdvuPftkNt7j@my-project-database.2jau5.mongodb.net/?retryWrites=true&w=majority&appName=my-project-database', // Change to your DB URL
      database: 'my-project-database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
