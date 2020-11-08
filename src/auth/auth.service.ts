import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    
    
    constructor(
        private userRepository: UserRepository,
                 private jwtService: JwtService) {

    }
    async signUp(userDto: UserDto) {
        try {
            const { email, password } = userDto;
            const userThere = await this.userRepository.find({ email });
            if (userThere?.length != 0) {
                throw new Error('User Already There');
            }
            const user = new User();
            user.email = email;
            user.password = await bcrypt.hash(password, 8);
            return await this.userRepository.save(user);

        } catch (e) {
            console.log(e);
            return { status: 500, message: e.message }
        }
    }

    async login(userDto: UserDto, req: any) {
        try {
            const password = (req.header('Authorization').replace('Basic ', ''));

            const credentials = password.split(':');
            const userIsThere = await this.userRepository.find({ email: credentials[0] });
            let match = false;
            if (userIsThere?.length != 0) {

                match = await bcrypt.compare(credentials[1], userIsThere[0].password);
            }
            if (match) {
                const payload = {email : credentials[0]};
                
                const token = await this.jwtService.sign(payload);
                console.log(token)
                
                return { userIsThere, token };
            }
            else
                throw new UnauthorizedException();

        } catch (e) {
            console.log(`Username and password is Incorrect`, e);
            return { status: 401, message: 'UnAuthorized' }
        }
    }
}
