import { BadRequestException, HttpException } from "@nestjs/common";
import { NewCorpDto } from "src/DTO/Corportaion.dto";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employment } from "../Employment.entity";
import { CorpArea } from "../Mapping/CorpArea.entity";
import { CorpPart } from "../Mapping/CorpPart.entity";
import { CorpUserRole } from "../Mapping/CorpRole.entity";
import { CorpState } from "../Mapping/CorpState.entity";

@Entity({ name: "corporation" })
export class Corporation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "255"
    })
    name: string;

    @Column({
        type: "varchar",
        length: "255"
    })
    ceo: string;

    // 설립일
    @Column({
        type: "date",
    })
    createdAt: Date;

    // 부도의 날
    @DeleteDateColumn()
    deletedAt: Date;

    // 회사명 변경했을 때 
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => CorpArea, (corpArea) => corpArea.corp)
    corpArea: CorpArea[];

    @OneToMany(() => CorpPart, (corpPart) => corpPart.corp)
    corpPart: CorpPart[];

    @OneToMany(() => CorpState, (corpState) => corpState.corp)
    corpState: CorpState[];

    @OneToMany(() => Employment, (employment) => employment.corporation)
    employment: Employment[];

    @OneToMany(() => CorpUserRole, corpRole => corpRole.corp)
    corpRole: CorpUserRole[];
}