import { UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


export class jwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException('Пользователь не аутентифицирован или токен недействителен');
        }
        return user;
    }
}