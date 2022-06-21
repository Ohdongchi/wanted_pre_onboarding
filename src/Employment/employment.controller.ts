import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { NewEmploymentDto } from 'src/DTO/Employment.Dto';
import { EmploymentService } from './employment.service';

@Controller('employment')
export class EmploymentController {

    constructor(
        private employmentService: EmploymentService,
    ) { }


    @Post("/new")
    async newEmployment(
        @Req() req: Request,
        @Body() payload: NewEmploymentDto
    ): Promise<any> {
        return this.employmentService.newEmployment(req, payload)
    }
}
