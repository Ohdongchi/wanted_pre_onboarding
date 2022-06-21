import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CorpPart } from "../Mapping/CorpPart.entity";


@Entity({name:"part"})
export class Part extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "varchar",
        length:"40",
    })
    partName: string;

    @OneToMany(() => CorpPart, (corpPart) => corpPart.part)
    partCorp: CorpPart[];

}

