import React, { useEffect } from 'react';
import {  useQueryClient } from '@tanstack/react-query';
import { IMessage } from '../../shared/interface/interface';
import Message from '../../shared/ui/message/Message';
import PostForm from '../../shared/ui/post-form/Post-form';
import {useQueryProcessing} from '../../hooks/useQueryProcessing';
import './style.css';

const Chat = () => {
  const { data, websocket } = useQueryProcessing();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    websocket.current = new WebSocket('ws://localhost:8000');
    websocket.current.onmessage = (msg: any) => {
      const { message, event, id }= JSON.parse(msg.data);
      queryClient.setQueriesData(msg.data, (oldData: IMessage[] | undefined) => {
        if (event === 'delete') {
          return oldData?.filter(elem => elem.id !== id);
        } else {
          return oldData && [...oldData, message];
        }
      });
    }
    return () => {
      websocket.current && websocket.current.close();
    }
  }, [queryClient]);
  
  return (
    <>
      <div className="messages-box border">
        <ul>
          {data?.map((elem: IMessage) => {
            return (
              <Message key={elem.id} data={elem}/>
            )
          })}
        </ul>
      </div>
      <PostForm/>
    </>
  );
};

export default Chat;