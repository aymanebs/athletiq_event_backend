import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './event.schema';
import { Participant } from 'src/participants/participant.schema';

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

    // Create an event
    async create(createEventDto: CreateEventDto, userId: string): Promise<Event> {
        const event = new this.eventModel({ ...createEventDto, organiser: userId });
        return await event.save();
    }

    // Update an event
    async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        const event = await this.eventModel.findById(id);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
    }

    // Get all events 
    async getAll(userId: string) {
        const events = await this.eventModel.find({ organiser: userId });
        if (!events || events.length === 0) {
            throw new NotFoundException('Events not found');
        }
        return events;
    }

    // Get a single event 
    async getEventById(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id).populate({ 
            path: 'participants', 
            select: 'fullname email phone', 
            model: Participant.name 
        }).exec();
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    // Delete an event
    async delete(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return await this.eventModel.findByIdAndDelete(id).exec();
    }

    // Add a participant 
    async addParticipant(eventId: string, participantId): Promise<Participant> {
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        if (event.capacity && event.participants.length >= event.capacity) {
            throw new NotFoundException('Event capacity reached');
        }

        return await this.eventModel.findByIdAndUpdate(
            eventId,
            { 
                $push: { participants: participantId },
            },
            { new: true }
        );
    }

    // Removing  participant from an event and increment capacity
    async removeParticipant(eventId: string, participantId): Promise<String> {
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        participantId =new Types.ObjectId(participantId);
        await this.eventModel.findByIdAndUpdate(
            eventId,
            { 
                $pull: { participants: participantId },
            },
            { new: true }
        );
        return participantId.toString();
    }
}
