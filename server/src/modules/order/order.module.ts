import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OrdersController } from './order.controller'
import { Order, OrderSchema } from './order.schema'
import { OrderService } from './order.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrdersModule {}
