import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Event.name, schema: EventSchema}])],
  providers: [EventService],
  controllers: [EventController]
})
export class EventsModule {}
