import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { WebhookController } from './modules/order/order.controller'
import { OrdersModule } from './modules/order/order.module'
import { User } from './modules/user/user.entity'

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
    //testing something
    AuthModule,
    OrdersModule,
  ],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}
