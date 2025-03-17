import { MongooseModule } from '@nestjs/mongoose'
import { WebhookController } from './order.controller'
import { OrderService } from './order.service'
import { Module } from '@nestjs/common'
import { Order, OrderDocument, OrderSchema } from './order.schema'
import { Model } from 'mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [],
  providers: [OrderService],
})
export class OrdersModule {}
