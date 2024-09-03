import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models/auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: AuthModel.name, schema: AuthSchema
  }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
