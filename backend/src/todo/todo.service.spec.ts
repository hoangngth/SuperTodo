import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', () => {
      const createTodoDto = { title: 'Test Todo', notes: 'Test Notes' };
      const result = service.create(createTodoDto);

      expect(result.id).toBeDefined();
      expect(result.title).toBe('Test Todo');
      expect(result.notes).toBe('Test Notes');
      expect(result.isCompleted).toBe(false);
      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', () => {
      const createTodoDto1 = { title: 'Test Todo 1' };
      service.create(createTodoDto1);
      const createTodoDto2 = { title: 'Test Todo 2' };
      service.create(createTodoDto2);
      
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0].title).toBe('Test Todo 1');
      expect(result[1].title).toBe('Test Todo 2');
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', () => {
      const todo = service.create({ title: 'Test Todo' });
      const result = service.findOne(todo.id);
      expect(result).toBeDefined();
      expect(result.id).toBe(todo.id);
    });

    it('should throw NotFoundException when todo not found', () => {
      expect(() => service.findOne('nonexistent-id'))
        .toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      const todo = service.create({ title: 'Test Todo' });
      const result = service.update(todo.id, { title: 'Updated Todo' });
      expect(result.title).toBe('Updated Todo');
    });

    it('should throw NotFoundException when updating non-existent todo', () => {
      expect(() => service.update('nonexistent-id', { title: 'Updated Todo' }))
        .toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a todo', () => {
      const todo = service.create({ title: 'Test Todo' });
      service.remove(todo.id);
      expect(() => service.findOne(todo.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when removing non-existent todo', () => {
      expect(() => service.remove('nonexistent-id'))
        .toThrow(NotFoundException);
    });
  });
});