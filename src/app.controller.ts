import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { NewCorpDto } from './DTO/Corportaion.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/corp/new")
  async newCorporation(@Req() req: Request, @Body() payload: NewCorpDto): Promise<string> {
    return await this.appService.newCorp(payload);
  }

  @Post("/corp/user/role")
  async addUserCorpRole(@Req() req: Request, @Body() payload: any): Promise<any> {
    return await this.appService.addUserCorpRole(req, payload);
  }

}
