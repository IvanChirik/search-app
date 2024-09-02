import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductModelDocument = HydratedDocument<ProductModel>;

@Schema()
export class ProductModel {
    _id: string;
    image: string;
    title: string;
    price: number;
    oldPrice: number;
    credit: number;
    calculatedRating: number;
    description: string;
    advantages: string;
    disAdvantages: string;
    categories: string[];
    tags: string[];
    characteristics: {
        [key: string]: string;
    }
}


export const ProductSchema = SchemaFactory.createForClass(ProductModel);