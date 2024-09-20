import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtModuleAsyncOptions, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../jwt.strategy';



const config = new ConfigService();
const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: config.get("JWT_SECRET"),
      signOptions: { expiresIn: "30d" }
    };
  }
};

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtConfig)
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, JwtStrategy],
})
export class UserModule {}
