import { Body, Controller, Request,Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
    constructor(private userService:AuthService){}

    @Post('/signup')
    async signUp( @Body() user :  UserDto){
        return this.userService.signUp(user);
    }

    @Get('/login')    
    async login(@Body() user: UserDto, @Request() req: any){
        return this.userService.login(user, req);
    }

    
}
