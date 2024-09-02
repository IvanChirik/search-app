import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}
@Schema()
export class HHData {
    @Prop()
    count: number;
    @Prop()
    juniorSalary: number;
    @Prop()
    middleSalary: number;
    @Prop()
    seniorSalary: number;
}
export const HHDataSchema = SchemaFactory.createForClass(HHData);

@Schema()
export class TopPageAdvantage {
    @Prop()
    title: string;
    @Prop()
    description: string;
}
export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);


export type TopPageModelDocument = HydratedDocument<TopPageModel>;


@Schema({ timestamps: true })
export class TopPageModel {
    @Prop({ enum: TopLevelCategory })
    firstLevelCategory: TopLevelCategory;
    @Prop()
    secondCategory: string;
    @Prop({ unique: true })
    alias: string;
    @Prop()
    title: string;
    @Prop()
    category: string;
    @Prop({ type: HHDataSchema, required: false })
    hh?: HHData;
    @Prop({ type: [TopPageAdvantage] })
    advantages: TopPageAdvantage[];
    @Prop()
    seoText: string;
    @Prop()
    tagsTitle: string;
    @Prop([String])
    tags: string[];
}


export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);