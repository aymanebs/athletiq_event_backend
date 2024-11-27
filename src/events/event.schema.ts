import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { EventType } from "src/utils/type";

@Schema({
    collection: 'events',
    timestamps: true,
})

export class Event extends Document{

    @Prop({required:true,minlength:5,maxlength:30})
    title: string;

    @Prop({required: false, minlength:5})
    description: string;

    @Prop({required: false})
    image: string;

    @Prop({required: true, enum: Object.values(EventType)})
    type: EventType;

    @Prop({required: true, min: 1 })
    capacity: number;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    date: Date;

    @Prop({required: true, ref: 'User',type: Types.ObjectId})
    organiser: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Participant' }] })
    participants: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);