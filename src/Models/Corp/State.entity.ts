import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CorpState } from "../Mapping/CorpState.entity";


@Entity({ name: "state" })
export class State extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "30",
    })
    stateName: string;

    @OneToMany(() => CorpState, (corpState) => corpState.state)
    stateCorp: CorpState[];

    
}

