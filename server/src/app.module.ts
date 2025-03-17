import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './modules/user/user.entity'
import { AuthModule } from './modules/auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { WebhookController } from './modules/order/order.controller'
import { OrdersModule } from './modules/order/order.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/creatorsfy', {}),
    AuthModule,
    OrdersModule,
  ],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}
