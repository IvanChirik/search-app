import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { jwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';



@Controller('review')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService,
        private readonly telegramService: TelegramService
    ) { }

    @UseGuards(jwtAuthGuard)
    @Post('create')
    async create(@Body(new ValidationPipe()) dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @UseGuards(jwtAuthGuard)
    @Post('notify')
    async notify(@Body(new ValidationPipe()) dto: CreateReviewDto) {
        const message = `Имя: ${dto.name}\n`
            + `Заголовок: ${dto.title}\n`
            + `Описание: ${dto.description}\n`
            + `Рэйтинг: ${dto.rating}\n`
            + `ID продукта: ${dto.productId}\n`
        return this.telegramService.sendMessage(message)
    }

    @UseGuards(jwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }


    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
        console.log(email);
        return this.reviewService.findByProductId(productId);
    }
}
