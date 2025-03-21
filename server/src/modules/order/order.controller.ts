import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto } from './order.dto'
import { OrderByDateParams } from './types'

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  @HttpCode(204)
  async getFilteredOrders(@Body() params: OrderByDateParams) {
    return this.orderService.getOrdersByDate(params)
  }
}

@Controller('webhook')
export class WebhookController {
  constructor(private readonly orderService: OrderService) {}

  @Post('order')
  @HttpCode(200)
  async handleOrderWebhook(@Body() orderData: OrderDto) {
    const savedOrder = await this.orderService.saveOrder(orderData)
    if (savedOrder) {
      console.log('BRL pedido salvo.:', savedOrder)
    } else {
      console.log('Non-BRL pedido. Skipped.')
    }
    return { message: 'Dados do Webhook foi processado com sucesso' }
  }
}
