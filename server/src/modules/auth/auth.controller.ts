import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint que recebe um usuario, uma senha e uma loja e cadastra o usuario
  // checar tamanho de senha,
  // verificar se a loja precisa de alguma logica a mais.
  @Post('register')
  async register(@Body() body: { username: string; password: string; store: string }) {
    const user = await this.authService.register(body.username, body.password, body.store)
    return {
      message: 'Usuário cadastrado com sucesso.',
      user,
    }
  }

  // Endpoint para login passando usuario e senha
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.login(body.username, body.password)
    return {
      message: 'Login realizado com sucesso',
      user,
      // token: '...'
    }
  }
}
