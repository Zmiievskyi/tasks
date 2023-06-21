import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateTaskDto {

    @ApiProperty({example: 'Fix phone login input', description: 'Task title'})
    @IsString({message: 'Must be a string'})
    readonly name: string;

    @ApiProperty({example: 'Fix phone login input in registration component', description: 'Task description'})
    @IsString({message: 'Must be a string'})
    @Length(4, 100, {message: 'min length 4, max length 100'})
    readonly content: string;

    readonly categoryId: number | string;
}
