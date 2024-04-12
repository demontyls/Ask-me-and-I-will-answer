import { WebSocketServer } from "ws";
import Message from './ enteris/message.enteris.js';
import { ports } from './config/servers.js';

const wss = new WebSocketServer({ port: ports.wsPort }, () => console.log('ws go'));
export const createWebSocket = () => {
 return (
   wss.on('connection', (ws) => {
     ws.on('message', (data) => sendAll(data));
     ws.on('error', console.error);
   })
 )
}
const sendAll = (data) => {
  const { event, id, content } = JSON.parse(data);
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      event: event,
      message: new Message(content, id),
    }));
  })
}