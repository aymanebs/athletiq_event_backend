import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, Validate } from "class-validator";
import { EventType } from "src/utils/type";
import { IsFutureDate } from "src/validators/is-future-date.validator";


export class CreateEventDto{

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    description?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsEnum(EventType)
    type: EventType;

    @IsNumber()
    @Min(1)
    capacity: number;

    @IsString()
    address: string;

    @IsDate()
    @Validate(IsFutureDate)
    @Type(() => Date)
    date: Date;
}