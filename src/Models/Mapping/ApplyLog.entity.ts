import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Employment } from "../Employment.entity";
import { CorpArea } from "../Mapping/CorpArea.entity";
import { CorpPart } from "../Mapping/CorpPart.entity";
import { CorpState } from "../Mapping/CorpState.entity";
import { User } from "../User.entity";

@Entity({ name: "apply_log" })
@Unique(["employment", "user"])
export class ApplyLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employment, employment => employment.apply)
    employment: Employment;

    @ManyToOne(() => User, user => user.apply)
    user: User;
}