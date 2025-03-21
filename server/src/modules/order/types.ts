import { OrderDto } from './order.dto'

export type OrderByDateParams = {
  initialDate?: string
  endDate?: string
  page?: number
  limit: number
}

const StatusEnum = {
  PEDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const

const CurrencyEnum = {
  BRL: 'BRL',
  EUR: 'EUR',
  USD: 'USD',
} as const

export type DayTime =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24

export type OrdersByHour = {
  hour: DayTime | string
  totalOrders: number
}

type ObjectValues<T> = T[keyof T]

export type Status = ObjectValues<typeof StatusEnum>

export type Currency = ObjectValues<typeof CurrencyEnum>

export type FilteredOrdersPageResultDto = {
  orders: OrderDto[]
  totalAmount: number
  totalElements: number
  firstDate: string
  lastDate: string
  totalPages: number
  ordersByHour: OrdersByHour[]
}
