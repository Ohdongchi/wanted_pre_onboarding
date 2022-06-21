import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, Repository } from 'typeorm';

import { User } from 'src/Models/User.entity';
import { Employment } from 'src/Models/Employment.entity';
import { NewEmploymentDto } from 'src/DTO/Employment.Dto';
import { Corporation } from 'src/Models/Corp/Corporation.entity';

// import { dataSource } from 'src/util/DataSource';
@Injectable()
export class EmploymentService {

    constructor(

        // @InjectRepository(User)
        // private  userRepository: Repository<User>,
        private readonly dataSource: DataSource,
    ) {
    }
    // 공고 등록
    async newEmployment(req: Request, payload: NewEmploymentDto): Promise<any> {

        const corp = await this.dataSource.manager.getRepository(Corporation).createQueryBuilder("corp")
            .where("corp.id = :id", { id: payload.corpId })
            .getOne();
        if (!corp) {
            throw new BadRequestException("일치하는 회사가 없습니다.");
        }

        const employSql = await this.dataSource.manager.getRepository(Employment).createQueryBuilder("employment")
        const findEmployment = employSql
            .select(["replace(employment.position)"])
            .getOne();
        console.log(findEmployment);


        // dataSource test
        const insertEmployment = employSql
            .insert()
            .into(Employment)
            .values({
                position: payload.position,
                corporation: corp,
                reward: payload.reward,
                description: payload.description,
                stack:payload.stack
            })
            .execute();

        console.log(insertEmployment);
    }

}
