import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Controller('field')
export class FieldController {
  private ms2ServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ms2ServiceUrl = this.configService.get<string>('MS2_URL');
  }

  @Get()
  async getAllFields(): Promise<any> {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.ms2ServiceUrl}/field`).pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: `No fields found`,
              },
              HttpStatus.NOT_FOUND,
            );
          }),
        ),
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Erro finding fields`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createField(@Body() fieldData: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.ms2ServiceUrl}/field`, fieldData).pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: error.response?.data || `Error creating field`,
              },
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error creating field`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteField(@Param('id') id: number): Promise<any> {
    try {
      // Enviamos la solicitud DELETE al microservicio para eliminar el campo
      await lastValueFrom(
        this.httpService.delete(`${this.ms2ServiceUrl}/field/${id}`).pipe(
          catchError((error) => {
            throw new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: `Field with ID ${id} not found`,
              },
              HttpStatus.NOT_FOUND,
            );
          }),
        ),
      );

      // Después de eliminar el campo, obtenemos todos los campos actualizados
      const updatedFields = await lastValueFrom(
        this.httpService.get(`${this.ms2ServiceUrl}/field`).pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Error fetching updated fields`,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );

      return updatedFields;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error deleting field`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
