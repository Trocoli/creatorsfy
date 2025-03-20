import { ApiProperty } from '@nestjs/swagger'
import { OrderDto } from './order.dto'
import { OrdersByHour } from './types'

export class FilteredOrdersPageResultDto {
  @ApiProperty({ description: 'Array com os pedidos' })
  orders!: OrderDto[]

  @ApiProperty({ description: 'Total do pedido' })
  totalAmount!: number

  @ApiProperty({ description: 'Objecto com pedidos por horário' })
  ordersByHour!: OrdersByHour[]
}
