import { ApiProperty } from '@nestjs/swagger'
import { Currency, Status } from './types'

export class OrderDto {
  @ApiProperty({ description: 'Identificador do pedido' })
  id!: string

  @ApiProperty({
    description: 'Data e horário de criação do pedido',
    type: String,
    format: 'date-time',
  })
  createdAt!: string

  @ApiProperty({ description: 'Preço do pedido' })
  amount!: number

  @ApiProperty({ description: 'Moeda em qual o pedido foi feito' })
  currency!: Currency

  @ApiProperty({ description: 'Id do produto associado ao pedido' })
  product!: string

  @ApiProperty({ description: 'Status do pedido' })
  status!: Status
}
