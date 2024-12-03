import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'users',
    timestamps: true,
})
export class User extends Document{

    @Prop({required:true,lowercase:true,trim:true,minLength:3,maxLength:20})
    first_name: string;

    @Prop({required:true,lowercase:true,trim:true,minLength:3,maxLength:20})
    last_name: string;

    @Prop({required:true,unique:true,lowercase:true,trim:true})
    email: string;

    @Prop({required:true,minlength:8})
    password: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);