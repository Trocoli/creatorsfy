import { Inject, Injectable } from '@nestjs/common'
import { OrderDto } from './order.dto'
import { Model } from 'mongoose'
import { Order, OrderDocument } from './order.schema'
import { InjectModel } from '@nestjs/mongoose'

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
}
