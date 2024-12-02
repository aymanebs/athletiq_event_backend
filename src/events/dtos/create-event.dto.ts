import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { EventType } from "../../utils/type";
import { IsFutureDate } from "../../validators/is-future-date.validator";


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