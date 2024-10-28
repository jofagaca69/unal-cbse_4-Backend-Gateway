import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP, options: { port: 3001 }},
      { name: 'BOOKING_SERVICE', transport: Transport.TCP, options: { port: 3002 }},
      { name: 'PAYMENT-SERVICE', transport: Transport.TCP, options: { port: 3003 }},
    ])
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
