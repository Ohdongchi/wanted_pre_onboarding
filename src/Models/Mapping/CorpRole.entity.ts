import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Corporation } from "../Corp/Corporation.entity";
import { State } from "../Corp/State.entity";
import { User } from "../User.entity";


@Entity({name: "corp_user_role"})
export class CorpUserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Corporation, (corp) => corp.corpRole)
    corp: Corporation;

    @ManyToOne(() => User, (user) => user.corpRole)
    user: User;

}

