import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { jwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserEmail } from 'src/decorators/user-email.decorator';



@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) { }


    @Post('create')
    async create(@Body(new ValidationPipe()) dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @UseGuards(jwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(jwtAuthGuard)
    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string, @UserEmail() email: string) {
        return this.reviewService.findByProductId(productId);
    }
}
