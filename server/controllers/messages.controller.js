import {getMessageCollection} from "../hellpers/getMessageCollection.js";
import fs from "node:fs";
import Message from "../ enteris/message.enteris.js";

class MessagesController {
  getMessages = async (req, res) => {
    try {
      res.send({data: getMessageCollection()});
    } catch (error) {
      res.send({error: error});
    }
  };
  postMessage = async (req, res) => {
    try {
      const collection = getMessageCollection();
      const { content, id } = req.body;
      collection.push(new Message(content, id));
      fs.writeFileSync('../bd/messageCollection.json', JSON.stringify(collection));
      res.send({isPosted: true});
    } catch (error) {
      res.send({error: error});
    }
  }
  deleteMessage = async (req, res) => {
    try {
      const collection = getMessageCollection().filter(elem => elem.id !== req.query.id);
      fs.writeFileSync('../bd/messageCollection.json', JSON.stringify(collection));
      res.send({isDelete: true});
    } catch (error) {
      res.send({error: error});
    }
  }
}

export default new MessagesController();