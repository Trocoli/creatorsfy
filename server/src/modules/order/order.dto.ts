import { Currency, Status } from './types'

export class OrderDto {
  id!: string
  createdAt!: string
  amount!: number
  currency!: Currency
  product!: string
  status!: Status
}
