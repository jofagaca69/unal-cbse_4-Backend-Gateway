import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {

    constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {
    }

    @Get()
    getUser(): Observable<any>{
        return this.userServiceClient.send({ cmd: 'get_user' }, { id: 1 })
    }
}
