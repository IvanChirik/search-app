import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';



const loginDto: AuthDto = {
    login: 'iii',
    password: 'i'
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - password-error', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: 'f' })
            .expect(401, {
                message: 'Неверный пароль.',
                error: "Unauthorized",
                statusCode: 401
            });
    });

    it('/auth/login (POST) - login-error', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: '1' })
            .expect(401, {
                message: 'Такого пользователя не зарегестрировано.',
                error: "Unauthorized",
                statusCode: 401
            });
    });

    afterAll(async () => {
        await disconnect();
        await app.close();
    });
});