import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UpdateEventDto } from './dtos/update-event.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './event.schema';


@Injectable()
export class EventService {

    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>){}

    async create(createEventDto: CreateEventDto,userId: string): Promise<Event>{
        const event = new this.eventModel({...createEventDto,organiser:userId});
        return await event.save();
    }

    async update(id: string,updateEventDto: UpdateEventDto): Promise<Event>{
        const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto, {new: true}).exec();
        console.log('event: ',event);
        return event;
    }

    async getAll(userId: string){
        const events = this.eventModel.find({organiser: userId});
        if(!events){
            throw new NotFoundException('Events not found');
        }
        return events;
    }

    async getEventById(id: string): Promise<Event>{
        const event = this.eventModel.findById(id).exec();
        if(!event){
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    async delete(id: string){
        const event = this.eventModel.findByIdAndDelete(id).exec();
        return event;
    }
}
