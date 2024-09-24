import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { jwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @UseGuards(jwtAuthGuard)
    @Post('create')
    async create(@Body(new ValidationPipe()) dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @UseGuards(jwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return product;
    }
    @UseGuards(jwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deleteProduct = await this.productService.deleteProductById(id);
        if (!deleteProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
    }
    @UseGuards(jwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body(new ValidationPipe()) dto: CreateProductDto) {
        const updatedProduct = await this.productService.updateProductById(id, dto);
        if (!updatedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return updatedProduct;
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body(new ValidationPipe()) dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
