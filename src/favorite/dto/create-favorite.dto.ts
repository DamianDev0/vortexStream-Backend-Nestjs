import { IsNumber, IsString, MaxLength, maxLength } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    userId: string;
    
    @IsString()
    mediaId: string;

    @IsString()
    imgMedia: string;

    @IsString()
    mediaTitle: string;

    @IsString()
    @MaxLength(600) 
    synopsis: string;

    @IsNumber()
    raiting: number;
}
