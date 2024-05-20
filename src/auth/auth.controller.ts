import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { KeycloakService } from 'src/keycloak/keycloack.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: any) {
    return await this.keycloakService.register(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() loginUserDto: any) {
    const { username, password } = loginUserDto;
    try {
      return await this.keycloakService.login(username, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
