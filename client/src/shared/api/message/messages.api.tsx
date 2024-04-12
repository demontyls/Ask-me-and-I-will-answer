import axios from 'axios';
import { IMessage } from '../../interface/interface';

class Messages {
   get = async () => {
    const { data } = await axios.get<any>('/message-api/get');
    return data.data;
  }
  delete = async (value:IMessage) => await axios.delete<IMessage>('/message-api/delete', {params: {...value}});
  post = async (value:IMessage) => await axios.post<IMessage>('/message-api/post', {...value});
}

export default new Messages();