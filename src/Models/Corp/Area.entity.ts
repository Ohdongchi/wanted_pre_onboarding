import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CorpArea } from "../Mapping/CorpArea.entity";


@Entity({ name: "area" })
export class Area extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "40",
    })
    areaName: string;

    @OneToMany(() => CorpArea, (corpArea) => corpArea.area)
    areaCorp: CorpArea[];

}

