import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeleteEmploymentDto, NewEmploymentDto, UpdateEmploymentDto } from 'src/DTO/Employment.Dto';
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

    @Post("/update")
    async updateEmployment(@Req() req: Request, @Body() payload: UpdateEmploymentDto): Promise<any> {
        return this.employmentService.updateEmployment(payload, req);
    }

    @Delete("/:id")
    async deleteEmployment(@Req() req: Request, @Param("id") id: number): Promise<any> {
        return this.employmentService.deleteEmployment(req, id);
    }

    @Get("/list")
    async getEmployment(): Promise<any> {
        return this.employmentService.getEmployment();
    }

    @Get("/")
    async getSearchData(@Query("search") query: any): Promise<any> {
        console.log(query);
        return this.employmentService.getSearchData(query);
    }

}
