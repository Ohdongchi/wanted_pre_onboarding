import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, Repository } from 'typeorm';

import { User } from 'src/Models/User.entity';
import { Employment } from 'src/Models/Employment.entity';
import { NewEmploymentDto, UpdateEmploymentDto } from 'src/DTO/Employment.Dto';
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

        // 회사찾기
        const corp = await this.dataSource.manager.getRepository(Corporation).createQueryBuilder("corp")
            .where("corp.id = :id", { id: payload.corpId })
            .getOne();

        if (!corp) {
            throw new BadRequestException("일치하는 회사가 없습니다.");
        }

        const employSql = this.dataSource.manager
            .getRepository(Employment)
            .createQueryBuilder("employment");


        // 중복된 공고
        const trimPosition = payload.position.replace(/(\s*)/g, '');

        const findEmployment = await employSql
            .select(["replace(employment.position, ' ', '') as position", "employment.corporation as corpId"])
            .having("position = :position", { position: trimPosition })
            .andHaving("corpId = :corpId", { corpId: payload.corpId })
            .getRawOne();

        if (findEmployment) {
            throw new BadRequestException("중복된 공고입니다.");
        }

        // 공고 등록
        const insertEmployment = employSql
            .insert()
            .into(Employment)
            .values({
                position: payload.position,
                corporation: corp,
                reward: payload.reward,
                description: payload.description,
                stack: payload.stack
            })
            .execute();
        return { message: "ok" };
        // console.log(insertEmployment);
    }

    async updateEmployment(payload: UpdateEmploymentDto): Promise<any> {

        const corp = await this.dataSource.manager.getRepository(Corporation).createQueryBuilder("corp")
            .where("corp.id = :id", { id: payload.corpId })
            .getOne();

        if (!corp) {
            throw new BadRequestException("일치하는 회사가 없습니다.");
        }

        

        return;
    }

}
