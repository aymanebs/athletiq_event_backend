import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateEventDto } from './dtos/update-event.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './event.schema';
import { Participant } from 'src/participants/participant.schema';


@Injectable()
export class EventService {

    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>){}

    async create(createEventDto: CreateEventDto,userId: string): Promise<Event>{
        const event = new this.eventModel({...createEventDto,organiser:userId});
        return await event.save();
    }

    async update(id: string,updateEventDto: UpdateEventDto): Promise<Event>{
        const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto, {new: true}).exec();
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
        const event = this.eventModel.findById(id).populate('participants').exec();
        if(!event){
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    async delete(id: string){
        const event = this.eventModel.findByIdAndDelete(id).exec();
        return event;
    }

    async addParticipant(eventId, participantId): Promise<void>{
        await this.eventModel.findByIdAndUpdate(eventId,{$push: {participants: participantId}},{new: true});
    }

    async removeParticipant(eventId, participantId): Promise<void>{
        participantId =new Types.ObjectId(participantId);
        await  this.eventModel.findByIdAndUpdate(eventId,{$pull: {participants: participantId}},{new: true});
    }

}
