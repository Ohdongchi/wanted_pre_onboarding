import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DataSource, EntityManager } from 'typeorm';
import { NewCorpDto } from './DTO/Corportaion.dto';
import { Area } from './Models/Corp/Area.entity';
import { Corporation } from './Models/Corp/Corporation.entity';
import { Part } from './Models/Corp/Part.entity';
import { State } from './Models/Corp/State.entity';
import { CorpArea } from './Models/Mapping/CorpArea.entity';
import { CorpPart } from './Models/Mapping/CorpPart.entity';
import { CorpState } from './Models/Mapping/CorpState.entity';


@Injectable()
export class AppService {

  constructor(
    private readonly dataSource: DataSource,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async newCorp(payload: NewCorpDto): Promise<any> {

    const trimCorpName = payload.corpName.replace(/(\s*)/g, "");

    // 만약 Dong Company 가 있다하면 이게 DongCompany가 되는 쿼리를 생성하고,
    const conditionCorpName = await this.dataSource.manager.getRepository(Corporation).createQueryBuilder("corp")
      .select([
        "replace(corp.name, ' ', '') as corpName"
      ])
      .having("corpName = :corpName", { corpName: trimCorpName })
      .getRawOne();

    if (conditionCorpName) {
      throw new BadRequestException("이미 존재하는 회사입니다.");
    }

    // 회사 추가
    const insertCorp = await this.dataSource.manager.getRepository(Corporation).createQueryBuilder("corp")
      .insert()
      .into(Corporation)
      .values({
        ceo: payload.ceo,
        name: payload.corpName,
        createdAt: payload.createdAt ? payload.createdAt : new Date(),
      })
      .execute();
    console.log(insertCorp);
    // state area part 조회 후 없으면 넣고 있으면 id값
    let state: any;
    let area: any;
    let part: any;

    this.dataSource.manager.transaction(async entityManager => {


      / * ====== State ====== */
      // state 가 있나 조회
      const findState = await this.dataSource.manager.getRepository(State).createQueryBuilder("state")
        .where("state.stateName = :stateName", { stateName: payload.state })
        .getOne();


      // 없으면 추가
      if (!findState) {
        const newState = new State();
        newState.stateName = payload.state;
        state = await entityManager.save(newState);
      } else {
        // 있으면 찾은 state 값을 state 변수에 넣고
        state = findState;
      }
      // mapping table insert, 위에서 넣은 state 값 id를 mapping table 값으로 넣어주기
      const newCorpState = new CorpState();
      newCorpState.corp = insertCorp.generatedMaps[0].id;
      newCorpState.state = state;
      await entityManager.save(newCorpState);


      / * ====== Area ====== */
      const findArea = await this.dataSource.manager.getRepository(Area).createQueryBuilder("area")
        .where("area.areaName = :areaName", { areaName: payload.area })
        .getOne();


      if (!findArea) {
        const newArea = new Area();
        newArea.areaName = payload.area;
        area = await entityManager.save(newArea);
      } else {
        area = findArea;
      }
      const newCorpArea = new CorpArea();
      newCorpArea.corp = insertCorp.generatedMaps[0].id;
      newCorpArea.area = area;
      await entityManager.save(newCorpArea);


      / * ====== Part ====== */
      const findPart = await this.dataSource.manager.getRepository(Part).createQueryBuilder("part")
        .where("part.partName = :partName", { partName: payload.part })
        .getOne();

      if (!findPart) {
        const newPart = new Part();
        newPart.partName = payload.part;
        part = await entityManager.save(newPart);
      } else {
        part = findPart;
      }

      const newCorpPart = new CorpPart();
      newCorpPart.corp = insertCorp.generatedMaps[0].id;
      newCorpPart.part = part;
      await entityManager.save(newCorpPart);

      

    })
    console.log("hi! 끝");
  }

}
