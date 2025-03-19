import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { OrderDto } from './order.dto'
import { OrderService } from './order.service'
import { OrderByDateParams } from './types'

@Controller('webhook')
export class WebhookController {
  constructor() {}

  // private readonly orderService: OrderService

  @Post('order')
  @HttpCode(200)
  async handleOrderWebhook(@Body() orderData: OrderDto) {
    if ((orderData.currency = 'BRL')) {
      //   await this.ordersService.saveOrder(orderData
      console.log('BRL order:', orderData)
    }
    console.log(orderData)
    return { message: 'Dados do Webhook foi processado com sucesso' }
  }
}

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
