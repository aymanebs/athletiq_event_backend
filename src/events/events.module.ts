import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';
import { Participant, ParticipantSchema } from 'src/participants/participant.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema},{ name: Participant.name, schema: ParticipantSchema } ])],
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController]
})
export class EventsModule {}
