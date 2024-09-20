import { IsNumber, IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    mediaId: string;

    @IsString()
    imgMedia: string;

    @IsString()
    mediaTitle: string;

    @IsString()
    synopsis: string;

    @IsNumber()
    rating: number;
}
