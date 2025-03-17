// schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrderDocument = Order & Document

@Schema()
export class Order {
  @Prop()
  id!: string

  @Prop()
  createdAt!: Date

  @Prop()
  amount!: number

  @Prop()
  currency!: string

  @Prop()
  product!: string

  @Prop()
  status!: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)
