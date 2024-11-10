import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { FieldController } from './field/field.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [UserController, FieldController],
  providers: [],
})
export class AppModule {}
