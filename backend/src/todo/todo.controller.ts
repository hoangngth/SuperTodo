import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { PermissionException } from '../common/exceptions/permission.exception';

type userRole = 'free' | 'paid';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Query('userRole') userRole = 'free'): TodoEntity {
    if (userRole !== 'paid' && createTodoDto.notes) {
      throw new PermissionException();
    }
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(): TodoEntity[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TodoEntity {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
         @Body() updateTodoDto: UpdateTodoDto,
         @Query('userRole') userRole = 'free'): TodoEntity {
    if (userRole !== 'paid' && updateTodoDto.notes) {
      throw new PermissionException();
    }
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
