import { IsOptional, IsString } from "class-validator";

export interface ActiveUserInterface{
    id: string;
    username: string;
    role: string;
}