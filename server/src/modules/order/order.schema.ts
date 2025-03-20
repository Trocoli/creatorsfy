// schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Currency, Status } from './types'

export type OrderDocument = Order & Document<Order, undefined, JSON>

@Schema()
export class Order {
  @Prop()
  id!: string

  @Prop()
  createdAt!: string

  @Prop()
  amount!: number

  @Prop()
  currency!: Currency

  @Prop()
  product!: string

  @Prop()
  status!: Status
}

export const OrderSchema = SchemaFactory.createForClass(Order)
