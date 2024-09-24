import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { NOT_FOUND_TOP_PAGE_BY_ALIAS_ERROR, NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { jwtAuthGuard } from 'src/auth/guards/jwt.guard';



@Controller('top-page')
export class TopPageController {


    constructor(private readonly topPageService: TopPageService) { }

    @UseGuards(jwtAuthGuard)
    @Post('create')
    async create(@Body(new ValidationPipe()) dto: CreateTopPageDto) {
        return this.topPageService.createTopPage(dto);
    }

    @UseGuards(jwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.findTopPageById(id);
        if (!topPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return topPage;
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const topPageByAlias = await this.topPageService.findTopPageByAlias(alias);
        if (!topPageByAlias) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_BY_ALIAS_ERROR);
        }
        return topPageByAlias;
    }

    @UseGuards(jwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedTopPage = this.topPageService.deleteTopPageById(id);
        if (!deletedTopPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
    }

    @UseGuards(jwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body(new ValidationPipe()) dto: CreateTopPageDto) {
        const updatedTopPage = await this.topPageService.updateTopPageById(id, dto);
        if (!updatedTopPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return updatedTopPage;
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body(new ValidationPipe()) dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }
}
