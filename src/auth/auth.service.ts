import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

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

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async signIn(userData: User) {
        const user = await this.userRepository.findOne({
            where: { username: userData.username },
        });

        const doMatch = await bcrypt.compare(userData.password, user?.password);
        if (!user || doMatch == false) {
            throw new HttpException(
                'Username or password is incorrect.',
                HttpStatus.NOT_FOUND,
            );
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        return {
            id: user.id,
            username: user.username,
            avatarURL: user.avatarURL,
            token,
        };
    }

    async getUserById(id: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { _id: new ObjectId(id) }
            });
            return user;
        } catch {

        }
    }
}
/*        
const user = await this.userRepository.findOne({
            where: { username: userData.username },
        });
*/