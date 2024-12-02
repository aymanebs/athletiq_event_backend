import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventService } from './events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './event.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { FileValidationPipe } from 'src/pipes/file-validation.pipe';

@UseGuards(JwtAuthGuard)
@Controller('events')

export class EventController {
    constructor(private readonly eventService: EventService){}

    
    @Post()
    @UseInterceptors(FileInterceptor('image',multerConfig()))
    async create(@Body() createEventDto: CreateEventDto, @Req() req: any, @UploadedFile(FileValidationPipe) image: Express.Multer.File): Promise<Event>{
        const imagePath = image?.path || null;
        return this.eventService.create({...createEventDto,image:imagePath},req.user.userId);
    }

    @Get()
    async getAll(@Req() req:any){
        return this.eventService.getAll(req.user.userId);
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('image', multerConfig()))
    async update(@Param('id') id: string,@Body() updateEventDto: UpdateEventDto,@UploadedFile(FileValidationPipe) image: Express.Multer.File,): Promise<Event> {
      const imagePath = image?.path || null;
      const updatedData = imagePath ? { ...updateEventDto, image: imagePath }: updateEventDto; 
      return this.eventService.update(id, updatedData);
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
