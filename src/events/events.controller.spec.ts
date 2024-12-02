import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventType } from '../utils/type';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  // Mock data for testing
  const mockUser = { userId: 'user123' };
  const mockEvent = {
    title: 'Test Event',
    description: 'Test Description',
    type: EventType.WORKSHOP,
    capacity: 50,
    address: '123 Test St',
    date: new Date('2024-12-31'),
    image: null,
    organiser: mockUser.userId,
    participants: [],
    _id: 'event123' as any
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            getEventById: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  describe('create', () => {
    it('should create a new event with all details', async () => {
      const createEventDto: CreateEventDto = {
        title: 'New Event',
        description: 'Event Description',
        type: EventType.WORKSHOP,
        capacity: 100,
        address: '456 Event Ave',
        date: new Date('2025-01-15')
      };

      const mockImage = {
        path: '/path/to/image.jpg'
      } as Express.Multer.File;

      const expectedResult = {
        ...createEventDto,
        _id: 'event123' as any,
        image: mockImage.path,
        organiser: mockUser.userId,
        participants: []
      };

      jest.spyOn(eventService, 'create').mockResolvedValue(expectedResult as any);

      const result = await eventController.create(
        createEventDto, 
        { user: mockUser } as any, 
        mockImage
      );

      expect(eventService.create).toHaveBeenCalledWith(
        {
          ...createEventDto,
          image: mockImage.path
        },
        mockUser.userId
      );
      expect(result).toEqual(expectedResult);
    });

    it('should create an event without an image', async () => {
      const createEventDto: CreateEventDto = {
        title: 'New Event',
        description: 'Event Description',
        type: EventType.WORKSHOP,
        capacity: 100,
        address: '456 Event Ave',
        date: new Date('2025-01-15')
      };

      const expectedResult = {
        ...createEventDto,
        _id: 'event123' as any,
        image: null,
        organiser: mockUser.userId,
        participants: []
      };

      jest.spyOn(eventService, 'create').mockResolvedValue(expectedResult as any);

      const result = await eventController.create(
        createEventDto, 
        { user: mockUser } as any, 
        null
      );

      expect(eventService.create).toHaveBeenCalledWith(
        {
          ...createEventDto,
          image: null
        },
        mockUser.userId
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getAll', () => {
    it('should retrieve all events for a user', async () => {
      const expectedEvents = [mockEvent];

      jest.spyOn(eventService, 'getAll').mockResolvedValue(expectedEvents as any);

      const result = await eventController.getAll({ user: mockUser });

      expect(eventService.getAll).toHaveBeenCalledWith(mockUser.userId);
      expect(result).toEqual(expectedEvents);
    });
  });

  describe('update', () => {
    it('should update an existing event with an image', async () => {
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
        type: EventType.WORKSHOP
      };

      const mockImage = {
        path: '/path/to/new-image.jpg'
      } as Express.Multer.File;

      const expectedResult = {
        ...mockEvent,
        ...updateEventDto,
        image: mockImage.path
      };

      jest.spyOn(eventService, 'update').mockResolvedValue(expectedResult as any);

      const result = await eventController.update(
        mockEvent._id, 
        updateEventDto, 
        mockImage
      );

      expect(eventService.update).toHaveBeenCalledWith(
        mockEvent._id,
        {
          ...updateEventDto,
          image: mockImage.path
        }
      );
      expect(result).toEqual(expectedResult);
    });

    it('should update an existing event without an image', async () => {
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
        type: EventType.WORKSHOP
      };

      const expectedResult = {
        ...mockEvent,
        ...updateEventDto
      };

      jest.spyOn(eventService, 'update').mockResolvedValue(expectedResult as any);

      const result = await eventController.update(
        mockEvent._id, 
        updateEventDto, 
        null
      );

      expect(eventService.update).toHaveBeenCalledWith(
        mockEvent._id,
        updateEventDto
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getEventById', () => {
    it('should retrieve a specific event by ID', async () => {
      jest.spyOn(eventService, 'getEventById').mockResolvedValue(mockEvent as any);

      const result = await eventController.getEventById(mockEvent._id);

      expect(eventService.getEventById).toHaveBeenCalledWith(mockEvent._id);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      jest.spyOn(eventService, 'delete').mockResolvedValue(mockEvent as any);

      const result = await eventController.delete(mockEvent._id);

      expect(eventService.delete).toHaveBeenCalledWith(mockEvent._id);
      expect(result).toEqual(mockEvent);
    });
  });
});