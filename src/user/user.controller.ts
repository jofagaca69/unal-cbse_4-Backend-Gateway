import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  getUser(@Param('id') id: number): Observable<any> {
    return this.userServiceClient.send({ cmd: 'get_user' }, { id }).pipe(
      catchError((err) => {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  @Post()
  createUser(
    @Body()
    userData: {
      name: string;
      lastname: string;
      email: string;
      phone?: string;
    },
  ): Observable<any> {
    return this.userServiceClient.send({ cmd: 'create_user' }, userData).pipe(
      catchError((err) => {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `User with email ${userData.email} already exists`,
          },
          HttpStatus.CONFLICT,
        );
      }),
    );
  }
}
