import { BadRequestException, ForbiddenException, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, Repository } from 'typeorm';

import { User } from 'src/Models/User.entity';
import { Employment } from 'src/Models/Employment.entity';
import { DeleteEmploymentDto, NewEmploymentDto, UpdateEmploymentDto } from 'src/DTO/Employment.Dto';
import { Corporation } from 'src/Models/Corp/Corporation.entity';
import { CorpUserRole } from 'src/Models/Mapping/CorpRole.entity';

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

    async updateEmployment(payload: UpdateEmploymentDto, req: Request): Promise<any> {

        // 급한대로 req.headers.user_id 에 userid를 넣어서 user가 이공고에 대해서 권한이 있는지 체크해야한다.
        // 공고수정 하는 부분이 조금 이상하다고 생각이든다. 데이터에 공고의 id 값도 있어야 한다고 생각해서 id값도 같이 body에 넣었다.

        // 만약 공고 id가 같이 날라온다면 먼저 이 공고를 기준으로 join 하여 기업의 id를 찾아야한다.

        const employment = await this.dataSource.manager.getRepository(Employment).createQueryBuilder("employment")
            .leftJoinAndSelect("employment.corporation", "corporation")
            .leftJoinAndSelect("corporation.corpRole", "corp_user_role")
            .where("employment.id = :id", { id: payload.employmentId })
            .andWhere("corp_user_role.userId =:userId", { userId: req.headers.user_id })
            .getOne();

        if (!employment) {
            // 권한 없음
            throw new UnauthorizedException("권한이 없습니다.");
        }

        const updateEmployment = await this.dataSource.manager.getRepository(Employment).createQueryBuilder('employment')
            .update(Employment)
            .set({
                position: payload.position,
                reward: payload.reward,
                description: payload.description,
                stack: payload.stack
            })
            .where("employment.id = :id", { id: payload.employmentId })
            .execute();

        if (updateEmployment.affected < 1) {
            throw new ForbiddenException("잘못된 요청입니다.");
        }

        return { message: "ok" };
    }

    async deleteEmployment(req: Request, id: number): Promise<any> {

        // Guard로 빼면 좋은데...
        const employment = await this.dataSource.manager.getRepository(Employment).createQueryBuilder("employment")
            .leftJoinAndSelect("employment.corporation", "corporation")
            .leftJoinAndSelect("corporation.corpRole", "corp_user_role")
            .where("employment.id = :employmentId", { employmentId: id })
            .andWhere("corp_user_role.userId =:userId", { userId: req.headers.user_id })
            .getOne();

        if (!employment) {
            // 권한 없음
            throw new UnauthorizedException("권한이 없습니다.");
        }

        // 기록을 굳이 지울필요는 없으닌간 deleteAt에 값을 넣어주면 typeorm이 deleteAt이 null 인것만 가져와서 조회시 조회가안된다.
        await this.dataSource.manager.transaction(async entityManager => {
            employment.deletedAt = new Date();
            await entityManager.save(employment);
        });

        return { message: "ok" };
    }

    async getEmployment(): Promise<any> {
        // 헷갈린다.. 나는 회사의 위치에 따라서 state, area, part를 지정했는데 지금와서 보면
        // 공고마다 지역이 다를 수 있을거다 라는 생각이 든다. 그러나 예시데이터를 보면 국가, 지역이 없어서 회사 entity에 넣어버렸다..
        return await (await Employment.getEmployments()).getRawMany();
    }

    async getSearchData(query: any): Promise<any> {
        return await (await Employment.getEmployments())
            .where("position like :search", { search: `%${query}%` })
            .orWhere("description like :search", { search: `%${query}%` })
            .orWhere("stack like :search", { search: `%${query}%` })
            .orWhere("areaName like :search", { search: `%${query}%` })
            .orWhere("stateName like :search", { search: `%${query}%` })
            .orWhere("partName like :search", { search: `%${query}%` })
            .orWhere("corporation.name like :search", { search: `%${query}%` })
            .getRawMany();
        // corporation.name as corpName 으로 별칭 지어줘도 왜 안되징... 연구를 더 해야봐야겠다..
    }

}
