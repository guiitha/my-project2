import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) {}

    async register(userData: User){
        const existingUser = await this.userRepository.findOne({
            where: { username: userData.username },
        });

        if (existingUser) {
            throw new HttpException(
                'This username has already been registered.',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    
        const HashedPassword = await bcrypt.hash(userData.password, 12);

        return await this.userRepository.save({
            username: userData.username,
            password: HashedPassword,
            avatarURL: userData.avatarURL,
            createdAt: new Date(),
        });
    }




}
