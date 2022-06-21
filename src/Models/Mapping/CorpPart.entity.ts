import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Corporation } from "../Corp/Corporation.entity";
import { Part } from "../Corp/Part.entity";


@Entity({name:"corp_part"})
export class CorpPart extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Corporation, (corp) => corp.corpPart)
    corp:Corporation;

    @ManyToOne(()=>Part, (part) => part.partCorp)
    part:Corporation;
}

