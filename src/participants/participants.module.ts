import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './participant.schema';
import { EventsModule } from 'src/events/events.module';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { EventService } from 'src/events/events.service';


@Module({
    imports: [MongooseModule.forFeature([{name: Participant.name, schema: ParticipantSchema}]), EventsModule],
    providers: [ParticipantsService],
    controllers: [ParticipantsController],
    
})
export class ParticipantsModule {}
