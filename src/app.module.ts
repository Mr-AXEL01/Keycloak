import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { KeycloakService } from './keycloak/keycloack.service';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, KeycloakService],
})
export class AppModule {}
