import { OmitType } from '@nestjs/mapped-types'
import { Expose } from 'class-transformer'
import { User } from './user.entity'

export class UserResponseObject extends OmitType(User, ['password'] as const) {
  @Expose()
  userId!: number

  @Expose()
  username!: string

  @Expose()
  store!: string
}
