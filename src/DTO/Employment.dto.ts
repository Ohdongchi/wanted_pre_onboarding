import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsDefined } from "class-validator";

export class NewEmploymentDto {

    @ApiProperty({
        description: "회사 id"
    })
    @IsDefined()
    @IsNumber()
    corpId: number;

    @ApiProperty({
        description: "채용 포지션",
    })
    @IsDefined()
    @IsString()
    position: string;

    @ApiProperty({
        description: "채용 보상금",
        default: 0
    })
    @IsDefined()
    @IsNumber()
    reward: number;

    @ApiPropertyOptional({
        description: "채용 설명"
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: "사용 기술"
    })
    stack: string;
}

