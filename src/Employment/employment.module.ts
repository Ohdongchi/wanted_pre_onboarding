import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';

import { User } from 'src/Models/User.entity';
import { Employment } from 'src/Models/Employment.entity';
import { Corporation } from 'src/Models/Corp/Corporation.entity';
import { Area } from 'src/Models/Corp/Area.entity';
import { CorpArea } from 'src/Models/Mapping/CorpArea.entity';
import { Part } from 'src/Models/Corp/Part.entity';
import { CorpPart } from 'src/Models/Mapping/CorpPart.entity';
import { State } from 'src/Models/Corp/State.entity';
import { CorpState } from 'src/Models/Mapping/CorpState.entity';
import { ModelsModule } from 'src/Models/models.module';

@Module({
    imports:[
        ModelsModule
    ],
    providers: [EmploymentService],
    controllers: [EmploymentController],
})
export class EmploymentModule { }
