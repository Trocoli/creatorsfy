// orders.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { OrderDto } from './order.dto'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server?: Server

  afterInit(server?: Server) {
    if (server) {
      console.log('WebSocket server inicializado.')
    }
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }

  emitNewOrder(orderData: OrderDto) {
    // "newOrder" nome do evento que será utilizado com o listen no front
    this.server?.emit('newOrder', orderData)
  }
}
