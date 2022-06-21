import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './Corp/Area.entity';
import { Corporation } from './Corp/Corporation.entity';
import { CorpArea } from './Mapping/CorpArea.entity';
import { CorpPart } from './Mapping/CorpPart.entity';
import { CorpState } from './Mapping/CorpState.entity';
import { Part } from './Corp/Part.entity';
import { State } from './Corp/State.entity';
import { Employment } from './Employment.entity';
import { User } from './User.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Employment,
            Corporation,
            Area,
            CorpArea,
            Part,
            CorpPart,
            State,
            CorpState,
        ]),
    ],
})
export class ModelsModule { }