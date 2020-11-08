import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrm } from './config/mongo.config';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './auth/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { MovieRepository } from './movie/movie.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrm),
    TypeOrmModule.forFeature([UserRepository,MovieRepository]),
    AuthModule,
    JwtModule.register({
      secret: 'avinash',
      signOptions: {
          expiresIn: 3600
      }
  })
  ],
  controllers: [AppController, MovieController, AuthController],
  providers: [AppService,MovieService, AuthService],
})
export class AppModule { }
