import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dtos/create-participant.dto';
import { Participant } from './participant.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UpdateParticipantDto } from './dtos/update-participant.dto';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class ParticipantsController {
    constructor(private readonly participantService: ParticipantsService){}

    @Post('/:eventId/participants')
    async create(@Body() createParticipantDto: CreateParticipantDto,@Param('eventId') eventId: string): Promise<Participant>{
        return this.participantService.addParticipant(createParticipantDto,eventId);
    }

    @Put('/:eventId/participants/:participantId')
    async update(@Param('participantId') participantId: string, @Body() updateParticipantDto: UpdateParticipantDto): Promise<Participant>{
        return this.participantService.updateParticipant(participantId,updateParticipantDto);
    }

    @Delete('/:eventId/participants/:participantId')
    async delete(@Param('participantId') participantId: string, @Param('eventId') eventId: string){
        return this.participantService.removeParticipant(participantId, eventId);
    }
}
