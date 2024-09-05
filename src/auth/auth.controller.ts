import { BadRequestException, Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTRED_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body(new ValidationPipe()) dto: AuthDto) {
        const isExistedUser = await this.authService.findUser(dto.login);
        if (isExistedUser) {
            throw new BadRequestException(ALREADY_REGISTRED_ERROR);
        }
        return this.authService.createUser(dto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body(new ValidationPipe()) { login, password }: AuthDto) {
        const user = await this.authService.validateUser(login, password);
        return this.authService.login(user.email);
    }
}
