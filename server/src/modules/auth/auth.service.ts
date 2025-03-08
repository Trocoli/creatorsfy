import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import * as bcrypt from 'bcrypt'

import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(username: string, password: string, store: string): Promise<User> {
    if (!username) {
      throw new HttpException('Nome de usuário obrigatório', HttpStatus.BAD_REQUEST)
    }
    if (!password) {
      throw new HttpException('Senha obrigatória', HttpStatus.BAD_REQUEST)
    }
    if (!store) {
      throw new HttpException('Nome da loja é obrigatório', HttpStatus.BAD_REQUEST)
    }
    const userExists = await this.userRepository.findOne({ where: { username } })
    if (userExists) {
      throw new HttpException('Já existe um usuário com esse nome.', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      store,
    })
    return this.userRepository.save(user)
  }

  async login(username: string, password: string): Promise<{ user: User; token: string }> {
    if (!username) {
      throw new HttpException('Nome de usuário obrigatório', HttpStatus.BAD_REQUEST)
    }
    if (!password) {
      throw new HttpException('Senha obrigatória', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.')
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Senha inválida.')
    }

    const payload = { username: user.username, sub: user.userId }
    const token = this.jwtService.sign(payload)
    return { user, token }
  }
}
