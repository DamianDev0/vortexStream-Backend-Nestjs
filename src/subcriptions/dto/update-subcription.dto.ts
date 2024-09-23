import { IsBoolean, IsString } from "class-validator";

export class UpdateSubcriptionDto{
    @IsBoolean()
    status: boolean

    @IsString()
    payMethodId: string

    @IsString()
    duration: string
}
