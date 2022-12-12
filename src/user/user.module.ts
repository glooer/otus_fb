import { jwtSecret } from "src/app.settings";
import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";

import { JwtStrategy } from './jwt/jwt.auth.strategy';
import { UserRepo } from './repo/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
export class UserModule { }
