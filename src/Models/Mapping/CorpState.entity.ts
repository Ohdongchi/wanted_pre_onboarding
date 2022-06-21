import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Corporation } from "../Corp/Corporation.entity";
import { State } from "../Corp/State.entity";


@Entity({name: "corp_state"})
export class CorpState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Corporation, (corp) => corp.corpState)
    corp: Corporation;

    @ManyToOne(() => State, (state) => state.stateCorp)
    state: State;

}

