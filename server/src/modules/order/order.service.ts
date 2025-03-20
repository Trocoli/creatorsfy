import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { OrderDto } from 'shared/orders/oder.dto'
import {
  DayTime,
  FilteredOrdersPageResultDto,
  OrderByDateParams,
  OrdersByHour,
} from 'shared/orders/types'
import { Order, OrderDocument } from './order.schema'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  //   async saveOrder(orderDto: OrderDto): Promise<Order> {
  //     const createOrder = new this.orderModel(orderDto)
  //     return createOrder.save()
  //   }

  //   async findAll(): Promise<Order[]> {
  //     return this.orderModel.find().exec()
  //   }

  async getOrdersByDate(params: OrderByDateParams): Promise<FilteredOrdersPageResultDto> {
    const { initialDate, endDate } = params
    const filter: FilterQuery<OrderDocument> = {}
    if (initialDate && endDate) {
      filter.createdAt = { $gte: initialDate, $lte: endDate }
    } else if (initialDate) {
      filter.createdAt = { $gte: initialDate }
    } else if (endDate) {
      filter.createdAt = { $lte: endDate }
    }
    const data = await this.orderModel.find(filter).exec()

    if (!data.length) {
      throw new HttpException(
        'Nenhum pedido foi encontrado para as datas informadas.',
        HttpStatus.NOT_FOUND
      )
    }

    const orders: OrderDto[] = data.map((order) => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        amount: order.amount,
        currency: order.currency,
        product: order.product,
        status: order.status,
      }
    })

    // calcular faturamento total
    const totalAmount = data.reduce((sum, doc) => sum + doc.amount, 0)

    const hoursMap: Record<number, number> = {}

    data.forEach((order) => {
      const dateObj = new Date(order.createdAt)
      const hour = dateObj.getHours() // 0..23
      hoursMap[hour] = (hoursMap[hour] || 0) + 1
    })

    const ordersByHour: OrdersByHour[] = Object.entries(hoursMap).map(([hour, total]) => ({
      hour: +hour as DayTime,
      totalOrders: total,
    }))

    return {
      orders,
      totalAmount,
      ordersByHour,
    }
  }
}
