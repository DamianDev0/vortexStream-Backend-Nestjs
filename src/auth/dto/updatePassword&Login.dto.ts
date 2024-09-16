import { IsOptional, IsString } from "class-validator";

export class ChangeEmailAndPassword{
    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;
}