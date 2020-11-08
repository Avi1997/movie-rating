import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwtStrategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register(
            {
                defaultStrategy: 'jwt'
            }),
        JwtModule.register({
            secret: 'avinash',
            signOptions: {
                expiresIn: 3600
            }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
    exports:[JwtStrategy,PassportModule]

})
export class AuthModule { }
