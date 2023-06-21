import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'min length 4, max length 16'})
    readonly password: string;

    @ApiProperty({example: 'ADMIN', description: 'Administrator or user'})
    // @IsString({message: 'Must be a string'})
    readonly role: string;

    @ApiProperty({example: 'John Dou', description: 'Full Name'})
    // @IsString({message: 'Must be a string'})
    readonly name: string;
}
