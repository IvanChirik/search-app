import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { ProductModel } from "src/product/models/product.model";



export type ReviewModelDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
    @Prop()
    name: string;
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    rating: number;
    @Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name })
    productId: ProductModel
}


export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
