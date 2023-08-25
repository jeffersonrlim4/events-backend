import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

function createId() {
  return Math.floor(Math.random() * 100000000);
}

@Controller('events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === Number(id));

    if (!event) {
      return 'não encontrado';
    }

    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const newEvent = {
      ...input,
      when: new Date(input.when),
      id: createId(),
    };

    this.events.push(newEvent);

    return newEvent;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === Number(id));

    if (index < 0) {
      return 'não encontrado';
    }

    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };

    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id) {
    this.events = this.events.filter((event) => event.id !== Number(id));
  }
}
