import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel, ReviewModelDocument } from './models/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {

    constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModelDocument>) { }

    async create(dto: CreateReviewDto): Promise<ReviewModelDocument> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<ReviewModelDocument | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<ReviewModelDocument[]> {
        return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
    }
}
