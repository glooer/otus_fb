import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './repo/user.repo';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "src/app.settings";
import { JwtStrategy } from './jwt/jwt.auth.strategy';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '10day' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo, JwtStrategy]
})
export class UserModule {}
