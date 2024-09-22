import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateHistoryUserDto {
    @IsOptional()
    @IsString()
    userId: string;

    @IsString()
    mediaId: string;

    @IsOptional()
    @IsString()
    imgMedia: string;

    @IsOptional()
    @IsString()
    mediaTitle: string;

    @IsOptional()
    @IsString()
    @MaxLength(1200)
    synopsis: string;

    @IsOptional()
    @IsNumber()
    rating: number;
}
