import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Order, OrderDocument } from './order.schema'
import { OrderByDateParams } from './types'

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

  async getOrdersByDate(params: OrderByDateParams): Promise<Order[]> {
    const { initialDate, endDate } = params
    const filter: FilterQuery<OrderDocument> = {}
    if (initialDate && endDate) {
      filter.createdAt = { $gte: initialDate, $lte: endDate }
    } else if (initialDate) {
      filter.createdAt = { $gte: initialDate }
    } else if (endDate) {
      filter.createdAt = { $lte: endDate }
    }
    return this.orderModel.find(filter).exec()
  }
}
