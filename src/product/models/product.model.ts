import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductModelDocument = HydratedDocument<ProductModel>;

@Schema()
class ProductCharacteristic {
    @Prop()
    name: string;
    @Prop()
    value: string;
}
export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);

@Schema({ timestamps: true })
export class ProductModel {
    @Prop()
    image: string;
    @Prop()
    title: string;
    @Prop()
    price: number;
    @Prop()
    oldPrice?: number;
    @Prop()
    credit: number;
    @Prop()
    description: string;
    @Prop()
    advantages: string;
    @Prop()
    disAdvantages: string;
    @Prop([String])
    categories: string[];
    @Prop([String])
    tags: string[];
    @Prop({ type: [ProductCharacteristicSchema], _id: false })
    characteristics: ProductCharacteristic[];
}


export const ProductSchema = SchemaFactory.createForClass(ProductModel);