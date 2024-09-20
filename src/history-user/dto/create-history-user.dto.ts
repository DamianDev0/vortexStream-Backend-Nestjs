import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateHistoryUserDto {
    @IsString()
    userId: string;

    @IsString()
    mediaId: string;

    @IsString()
    imgMedia: string;

    @IsString()
    mediaTitle: string;

    @IsString()
    @MaxLength(1200)
    synopsis: string;

    @IsNumber()
    raiting: number;
}
