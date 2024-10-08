import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel, TopPageModelDocument } from './models/top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {

    constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModelDocument>) { }


    async createTopPage(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    async findAll() {
        return this.topPageModel.find({}).exec();
    }

    async findTopPageById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async findTopPageByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel.aggregate().
            match({
                firstLevelCategory: firstCategory
            }).
            group({
                _id: { secondCategory: '$secondCategory' },
                page: { $push: { alias: '$alias', title: '$title' } }
            }).exec();
    }

    async findByText(text: string) {
        return this.topPageModel.find({
            $text: {
                $search: text,
                $caseSensitive: false
            }
        }).exec();
    }

    async updateTopPageById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async deleteTopPageById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

}
