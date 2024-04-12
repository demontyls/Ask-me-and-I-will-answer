import express from 'express';
import * as bodyParser from "express";
import { ports } from './config/servers.js';
import messagesRoutes from './routes/messages.routes.js';
import { createWebSocket } from './websoketServer.js';

const app = express();

app.listen(ports.httpPort, () => console.log('go'));
createWebSocket();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/message-api', messagesRoutes);