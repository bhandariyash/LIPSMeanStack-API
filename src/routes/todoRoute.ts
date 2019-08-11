import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { auth } from '../middleware/auth';

export const todoRoute = Router();

todoRoute.get('/', auth, TodoController.getTodoList);
todoRoute.post('/', auth, TodoController.addTodo);
todoRoute.put('/', auth, TodoController.updateTask);