import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({example: 'Developers', description: 'Category name'})
    @IsString({message: 'Must be a string'})
    readonly name: string;

    readonly userId: number;
}
