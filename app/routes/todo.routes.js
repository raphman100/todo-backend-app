import express from 'express';
const todoRouter = express.Router();
import TodoController from '../controllers/todo.controller.js';

todoRouter.get( '/', TodoController.findAll );
todoRouter.get( '/:id', TodoController.findOne );
todoRouter.post( '/', TodoController.create );
todoRouter.put( '/:id', TodoController.update );
todoRouter.delete( '/', TodoController.deleteAll );
todoRouter.delete( '/:id', TodoController.deleteOne );

export default todoRouter;
