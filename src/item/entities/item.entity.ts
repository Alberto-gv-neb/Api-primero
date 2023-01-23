import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Item extends Document{

    @Prop({ 
        unique: true,
        index: true
    })
    name: string;

    @Prop({ 
        unique: true,
        index: true
    })
    number: number;

}

export const itemSchema = SchemaFactory.createForClass(Item)
