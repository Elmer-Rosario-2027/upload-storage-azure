import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';

@Injectable()
export class GatewayService {
  create(createGatewayDto: CreateGatewayDto) {
    return 'This action adds a new gateway';
  }

  findAll() {
    return `This action returns all gateway on cloud AZURE`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} gateway`;
  }
}
