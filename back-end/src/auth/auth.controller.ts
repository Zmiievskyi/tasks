import { Body, Controller, Post, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Autorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signin")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post("/signup")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
