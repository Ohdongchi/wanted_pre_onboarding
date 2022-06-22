import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { pipe } from 'rxjs';
import { ApplyAndDeleteEmploymentDto, NewEmploymentDto, UpdateEmploymentDto } from 'src/DTO/Employment.Dto';
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
    async deleteEmployment(@Req() req: Request, @Param("id", ParseIntPipe) id: number): Promise<any> {
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

    @Get("/detail/:id")
    async getDetailEmployment(@Param("id", ParseIntPipe) id: number): Promise<any> {
        console.log(id);
        return this.employmentService.getDetailEmployment(id);
    }

    @Post("/apply")
    async applyEmployment(@Req() req: Request, @Body() payload: ApplyAndDeleteEmploymentDto): Promise<any> {
        return this.employmentService.applyEmployment(req, payload);
    }

}
