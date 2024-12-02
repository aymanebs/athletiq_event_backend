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

    image?: string;

    @IsEnum(EventType)
    type: EventType;

    capacity: number;

    @IsString()
    address: string;

    @IsDate()
    @Validate(IsFutureDate)
    @Type(() => Date)
    date: Date;
}