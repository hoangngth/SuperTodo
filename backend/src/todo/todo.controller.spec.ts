import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PermissionException } from '../common/exceptions/permission.exception';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo without notes for free user', () => {
      const createTodoDto = { title: 'Test Todo' };
      const result = controller.create(createTodoDto, 'free');
      expect(result.title).toBe('Test Todo');
      expect(result.notes).toBeUndefined();
    });

    it('should create a todo with notes for paid user', () => {
      const createTodoDto = { title: 'Test Todo', notes: 'Test Notes' };
      const result = controller.create(createTodoDto, 'paid');
      expect(result.title).toBe('Test Todo');
      expect(result.notes).toBe('Test Notes');
    });

    it('should throw PermissionException when free user tries to add notes', () => {
      const createTodoDto = { title: 'Test Todo', notes: 'Test Notes' };
      expect(() => controller.create(createTodoDto, 'free'))
        .toThrow(PermissionException);
    });
  });

  describe('findAll', () => {
    it('should return all todos', () => {
      const todos = [
        { id: '1', title: 'Todo 1', notes: 'Notes 1', isCompleted: false, createdAt: new Date() },
        { id: '2', title: 'Todo 2', notes: 'Notes 2', isCompleted: true, createdAt: new Date() }
      ];

      // Replaces original findAll with a new function that simply returns the todos array.
      jest.spyOn(service, 'findAll').mockImplementation(() => todos);
      
      const result = controller.findAll();
      expect(result.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a todo by ID', () => {
      const todo = { id: '1', title: 'Test Todo', notes: 'Test Notes', isCompleted: false, createdAt: new Date() };
      jest.spyOn(service, 'findOne').mockImplementation(() => todo);
      const result = controller.findOne('1');
      expect(result.id).toBe('1');
    });
  });

  describe('update', () => {
    it('should update a todo without notes for free user', () => {
      const todo = service.create({ title: 'Test Todo' });
      const updateTodoDto = { title: 'Updated Todo' };
      const result = controller.update(todo.id, updateTodoDto, 'free');
      expect(result.title).toBe('Updated Todo');
      expect(result.notes).toBeUndefined();
    });

    it('should update a todo with notes for paid user', () => {
      const todo = service.create({ title: 'Test Todo' });
      const updateTodoDto = { title: 'Updated Todo', notes: 'Updated Notes' };
      const result = controller.update(todo.id, updateTodoDto, 'paid');
      expect(result.title).toBe('Updated Todo');
      expect(result.notes).toBe('Updated Notes');
    });

    it('should throw PermissionException when free user tries to add notes', () => {
      const updateTodoDto = { title: 'Updated Todo', notes: 'Updated Notes' };
      expect(() => controller.update('1', updateTodoDto, 'free'))
        .toThrow(PermissionException);
    });
  });
});