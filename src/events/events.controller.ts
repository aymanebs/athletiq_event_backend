import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { EventService } from './events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './event.schema';

@UseGuards(JwtAuthGuard)
@Controller('events')

export class EventController {
    constructor(private readonly eventService: EventService){}

    
    @Post()
    async create(@Body() createEventDto: CreateEventDto, @Req() req: any): Promise<Event>{
        return this.eventService.create(createEventDto,req.user.userId);
    }

    @Get()
    async getAll(@Req() req:any){
        return this.eventService.getAll(req.user.userId);
    }

    @Put('/:id')
    async update(@Param('id') id: string,@Body() updateEventDto: UpdateEventDto): Promise<Event>{
        return this.eventService.update(id,updateEventDto);
    }

    @Get('/:id')
    async getEventById(@Param('id') id: string): Promise<Event>{
        return this.eventService.getEventById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Event>{
        return this.eventService.delete(id);
    }
    

}
