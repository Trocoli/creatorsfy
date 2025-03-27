import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { plainToInstance } from 'class-transformer'
import { UserResponseObject } from '../user/user.response.object'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint que recebe um usuario, uma senha e uma loja e cadastra o usuario
  // checar tamanho de senha usar validators,
  // verificar se a loja precisa de alguma logica a mais.
  @Post('register')
  async register(@Body() body: { username: string; password: string; store: string }) {
    const user = await this.authService.register(body.username, body.password, body.store)
    const userResponseObject = plainToInstance(UserResponseObject, user, {
      excludeExtraneousValues: true,
    })
    return {
      message: 'Usuário cadastrado com sucesso.',
      user: userResponseObject,
    }
  }

  // Endpoint para login passando usuario e senha, retorna userinfo e jwt token
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { username: string; password: string }) {
    const { user, token } = await this.authService.login(body.username, body.password)
    const userResponseObject = plainToInstance(UserResponseObject, user, {
      excludeExtraneousValues: true,
    })
    return {
      message: 'Login realizado com sucesso',
      userInfo: userResponseObject,
      token,
    }
  }
}
