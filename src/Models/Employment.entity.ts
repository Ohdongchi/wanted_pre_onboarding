import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Corporation } from "./Corp/Corporation.entity";
import { ApplyLog } from "./Mapping/ApplyLog.entity";

@Entity({ name: "employment" })
export class Employment extends BaseEntity {
    @PrimaryGeneratedColumn()   
    id: number;

    // 채용 포지션
    @Column({
        type: "varchar",
        length: "255"
    })
    position: string;

    // 채용 보상금
    @Column({
        type: "int",
        default: 0
    })
    reward: number;

    // 채용 설명
    @Column({
        type: "text",
    })
    description: string;

    // 기술
    @Column({
        type: "varchar",
        length: "255"
    })
    stack: string; 
    // 하나만 넣는다면 string 하지만 여러개의 데이터를 넣어야 한다면 따로 table 빼서 관계설정해서 하거나 enum으로 대체

    @ManyToOne(()=>Corporation, corp => corp.id)
    corporation: Corporation;

    @OneToMany(()=>ApplyLog, apply => apply.employment) 
    apply: ApplyLog[];

    // 공고 삭제 날짜
    @DeleteDateColumn()
    deletedAt: Date;

    // 공고 수정 날짜
    @UpdateDateColumn()
    updatedAt: Date;

    // 공고 생성 날짠
    @CreateDateColumn()
    createdAt: Date;

}