import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel, AuthModelDocument } from './models/auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModelDocument>) { }

    async create(dto: AuthDto) {
        return await this.authModel.create({ email: dto.login, passwordHash: dto.password });
    }
}
