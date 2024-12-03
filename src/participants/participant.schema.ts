import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    collection: 'participants',
    timestamps: true,
})

export class Participant extends Document{

    @Prop({required: true,type: Types.ObjectId,ref: 'Event'})
    eventId: Types.ObjectId;

    @Prop({required: true,type: String, minlength: 5,maxlength: 30})
    fullname: string;

    @Prop({required: true,unique: true,type: String})
    email: string;

    @Prop({type: String})
    phone: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
ParticipantSchema.index({ eventId: 1, email: 1 }, { unique: true });