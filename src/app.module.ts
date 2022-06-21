import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmploymentController } from './Employment/employment.controller';
import { EmploymentService } from './Employment/employment.service';
import { EmploymentModule } from './Employment/employment.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelsModule } from './Models/models.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // process.env 를 써야하는건지 configService를 쓰는게 나은건지... 추천 하는 configService가 좋아보이는데..
        return {
          type: "mysql",
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: ["dist/**/*.entity.js"],
          migrations: ["dist/migration/*.js"],
          synchronize: true,
        };
      }
    }),
    EmploymentModule,
    ModelsModule
  ],
  controllers: [AppController, EmploymentController],
  providers: [AppService, EmploymentService],
})
export class AppModule { }
