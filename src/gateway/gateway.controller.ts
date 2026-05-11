import { Controller, Get, Post, Body } from '@nestjs/common';
import { GatewayService } from './service/gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';

@Controller('gateway')
export class GatewayController {
  
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  create(@Body() createGatewayDto: any) {
    return this.gatewayService.processReport(createGatewayDto);
  }
}
