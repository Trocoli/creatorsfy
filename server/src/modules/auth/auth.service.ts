import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    password: string,
    store: string,
  ): Promise<User> {
    if (!username || !password || !store) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      store,
    });
    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Senha inválida.');
    }
    return user;
  }
}
