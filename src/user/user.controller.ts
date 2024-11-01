import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Controller('user')
export class UserController {
  private userServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userServiceUrl = this.configService.get<string>('MS1_URL');
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<any> {
    try {
      console.info(`URL: ${this.userServiceUrl}/user/${id}`);
      const response = await lastValueFrom(
        this.httpService.get(`${this.userServiceUrl}/user/${id}`).pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: `User with ID ${id} not found`,
              },
              HttpStatus.NOT_FOUND,
            );
          }),
        ),
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      name: string;
      lastname: string;
      email: string;
      phone?: string;
    },
  ): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.userServiceUrl}/user`, userData).pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new HttpException(
              {
                status: HttpStatus.CONFLICT,
                error: `User with email ${userData.email} already exists`,
              },
              HttpStatus.CONFLICT,
            );
          }),
        ),
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `User with email ${userData.email} already exists`,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
