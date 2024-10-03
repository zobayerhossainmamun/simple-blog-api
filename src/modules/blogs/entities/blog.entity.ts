import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'blogs', timestamps: true })
export class Blog extends Document {
    @Prop({ type: String, maxlength: 24 })
    userName: string;

    @Prop({ type: String, maxlength: 100 })
    title: string;

    @Prop({ type: String})
    description: string;

    createdAt: Date;
    updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);