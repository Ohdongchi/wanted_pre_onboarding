import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsDefined, IsOptional, IsString } from "class-validator";

export class NewCorpDto {
    @ApiProperty({
        description: "회사명"
    })
    @IsString()
    @IsDefined()
    corpName: string;

    @ApiProperty({
        description: "사장 이름"
    })
    @IsString()
    @IsDefined()
    ceo: string;

    @ApiProperty({
        description: "국가 "
    })
    @IsString()
    @IsDefined()
    state: string;

    @ApiProperty({
        description: "도시 근무지가 2개 일 경우 array"
    })
    @IsString()
    @IsDefined()
    area: string;

    @ApiProperty({
        description: "분야가 여러개를 예상해서 array"
    })
    @IsString()
    @IsDefined()
    part: string;

    @ApiPropertyOptional({
        description: "설립일자 없을경우 현재 날짜",
        default: new Date(),
    })
    @IsOptional()
    @IsDate()
    createdAt: Date;
}