import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEventDto, GetAllEventsDto, UpdateEventDto } from "../dto";
import { EventDocument, EventEntity } from "../schemas";
import { EventsService } from "../services";

@ApiTags("Event")
@Controller("events")
export class EventController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiResponse({ status: 201, type: EventEntity })
  async create(@Body() data: CreateEventDto): Promise<EventDocument> {
    return await this.eventsService.create(data);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: EventEntity })
  async getEventById(@Param("id") id: string): Promise<EventDocument> {
    return this.eventsService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [EventEntity] })
  async getEvent(@Query() params: GetAllEventsDto): Promise<EventDocument[]> {
    return this.eventsService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: EventEntity })
  async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDto): Promise<EventDocument> {
    return await this.eventsService.updateById(id, data);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Param("id") id: string): Promise<boolean> {
    return await this.eventsService.deleteById(id);
  }
}
