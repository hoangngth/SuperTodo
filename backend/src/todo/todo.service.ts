import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: TodoEntity[] = [];

  create(createTodoDto: CreateTodoDto): TodoEntity {
    const todo = new TodoEntity();
    todo.id = (Math.floor(Math.random() * 1000000 + 1)).toString(36);
    todo.title = createTodoDto.title;
    todo.isCompleted = false;
    todo.createdAt = new Date();
    todo.notes = createTodoDto.notes;

    this.todos.push(todo);
    return todo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: string) {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): TodoEntity {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todos.splice(index, 1);
  }
}
