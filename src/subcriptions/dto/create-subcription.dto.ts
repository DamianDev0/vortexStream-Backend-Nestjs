import { IsString } from "class-validator";

export class CreateSubcriptionDto {
    @IsString()
    userId: string;

}
