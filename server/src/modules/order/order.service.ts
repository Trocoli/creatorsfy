import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Order, OrderDocument } from './order.schema'
import { OrderDto } from './order.dto'
import { OrderByDateParams, FilteredOrdersPageResultDto, OrdersByHour, DayTime } from './types'
import { first } from 'rxjs'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async saveOrder(orderDto: OrderDto): Promise<Order> {
    const createOrder = new this.orderModel(orderDto)
    if (orderDto.currency === 'BRL') {
      return createOrder.save()
    }
    return createOrder
  }

  //   async findAll(): Promise<Order[]> {
  //     return this.orderModel.find().exec()
  //   }

  async getOrdersByDate(params: OrderByDateParams): Promise<FilteredOrdersPageResultDto> {
    const { initialDate, endDate, page = 1, limit = 10 } = params

    const filter: FilterQuery<OrderDocument> = {}
    if (initialDate && endDate) {
      filter.createdAt = { $gte: initialDate, $lte: endDate }
    } else if (initialDate) {
      filter.createdAt = { $gte: initialDate }
    } else if (endDate) {
      filter.createdAt = { $lte: endDate }
    }

    const allDocs = await this.orderModel.find(filter).exec()
    if (!allDocs.length) {
      throw new HttpException(
        'Nenhum pedido foi encontrado para as datas informadas.',
        HttpStatus.NOT_FOUND
      )
    }

    // calcular faturamento total
    const totalAmount = allDocs.reduce((sum, doc) => sum + doc.amount, 0)
    const totalElements = allDocs.length
    const totalPages = totalElements / limit

    const createdDates = allDocs.map((order) => new Date(order.createdAt).getTime())
    let firstDate = new Date(Math.min(...createdDates))
    let lastDate = new Date(Math.max(...createdDates))

    const hoursMap: Record<number, number> = {}
    allDocs.forEach((order) => {
      const dateObj = new Date(order.createdAt)
      const hour = dateObj.getHours() // 0..23
      hoursMap[hour] = (hoursMap[hour] || 0) + 1
    })
    const ordersByHour: OrdersByHour[] = Object.entries(hoursMap).map(([hour, total]) => ({
      hour: hour.toString() + 'h ',
      totalOrders: total,
    }))

    const skipCount = (page - 1) * limit
    const paginatedOrders = await this.orderModel.find(filter).skip(skipCount).limit(limit).exec()

    const orders: OrderDto[] = paginatedOrders.map((order) => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        amount: order.amount,
        currency: order.currency,
        product: order.product,
        status: order.status,
      }
    })

    return {
      orders,
      totalAmount,
      totalElements,
      firstDate: firstDate.toISOString(),
      lastDate: lastDate.toISOString(),
      totalPages,
      ordersByHour,
    }
  }
}
