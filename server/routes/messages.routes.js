import MessagesController from '../controllers/messages.controller.js';
import { Router } from 'express';

const MessagesRouter = new Router();
MessagesRouter.get('/get', MessagesController.getMessages);
MessagesRouter.post('/post', MessagesController.postMessage);
MessagesRouter.delete('/delete', MessagesController.deleteMessage);

export default MessagesRouter;
