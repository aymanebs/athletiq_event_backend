import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './participant.schema';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dtos/create-participant.dto';
import { UpdateParticipantDto } from './dtos/update-participant.dto';
import { EventService } from 'src/events/events.service';

@Injectable()
export class ParticipantsService {

    constructor(@InjectModel(Participant.name) private readonly participantModel: Model<Participant>,
                private readonly eventService: EventService){}

    async addParticipant(createParticipantDto: CreateParticipantDto, eventId: string): Promise<Participant>{
        const participant= new this.participantModel({...createParticipantDto,eventId});
        await participant.save();
        await this.eventService.addParticipant(eventId,participant._id);
        return participant;
    }

    async updateParticipant(participantId: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant>{
        const participant = await this.participantModel.findById(participantId);
        if(! participant){
            throw new NotFoundException('Participant not found');
        }
        return await this.participantModel.findByIdAndUpdate(participantId,updateParticipantDto,{new:true});
        
    }

    async removeParticipant(participantId: string, eventId: string){

        const participant = await this.participantModel.findById(participantId);
        if(! participant){
            throw new NotFoundException('Participant not found');
        }
        await this.participantModel.findByIdAndDelete(participantId);
        return await this.eventService.removeParticipant(eventId,participantId);
        
    }
}
