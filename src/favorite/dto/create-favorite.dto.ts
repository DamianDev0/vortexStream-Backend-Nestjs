import { IsNumber, IsOptional, IsString, MaxLength, maxLength } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    userId: string;
    
    @IsString()
    mediaId: string;

    @IsString()
    backdrop_path: string;

    @IsString()
    title: string;

    @IsString()
    @MaxLength(1200) 
    overview: string;

    @IsNumber()
    vote_average: number;

    @IsOptional()
    @IsString()
    typeMedia?: string;
}
