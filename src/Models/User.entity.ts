import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApplyLog } from "./Mapping/ApplyLog.entity";
import { CorpUserRole } from "./Mapping/CorpRole.entity";

@Entity({ name: "user" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "255"
    })
    name: string;

    @OneToMany(() => ApplyLog, apply => apply.user)
    apply: ApplyLog[];

    @OneToMany(()=>CorpUserRole, (corpUserRole) => corpUserRole.user)
    corpRole: CorpUserRole[];
}