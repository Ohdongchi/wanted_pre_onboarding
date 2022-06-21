import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Area } from "../Corp/Area.entity";
import { Corporation } from "../Corp/Corporation.entity";


@Entity({name:"corp_area"})
export class CorpArea extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(()=>Corporation, (corp) => corp.corpArea)
    corp:Corporation;

    @ManyToOne(()=>Area, (area) => area.areaCorp)
    area:Corporation;
}