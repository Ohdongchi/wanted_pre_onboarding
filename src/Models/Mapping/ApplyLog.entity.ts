import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employment } from "../Employment.entity";
import { CorpArea } from "../Mapping/CorpArea.entity";
import { CorpPart } from "../Mapping/CorpPart.entity";
import { CorpState } from "../Mapping/CorpState.entity";
import { User } from "../User.entity";

@Entity({ name: "apply_log" })
export class ApplyLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Employment, employment => employment.apply)
    employment: Employment;

    @ManyToOne(()=>User, user=> user.apply)
    user: User;
}