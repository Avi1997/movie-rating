import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy,ExtractJwt} from 'passport-jwt';
import { UserRepository } from './user.repository';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)  {
    constructor (private userRepo:UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'avinash'
        });
    }
   
    async validate(response: any){
        const user = await this.userRepo.find({email: response.email});
        if(user.length == 0){
            throw new UnauthorizedException();
        }else{
            return user;
        }
    }


}



