import { MutableRefObject, useRef } from 'react';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Messages from '../shared/api/message/messages.api';
import { IMessage } from '../shared/interface/interface';

type TReturn = {
  data: IMessage[];
  websocket: MutableRefObject<WebSocket | null>;
  mutationDelete: any;
  mutationPost: any;
}
export function useQueryProcessing (): TReturn {
  const { data } = useQuery({queryKey: ['messages'], queryFn: Messages.get});
  const queryClient = useQueryClient();
  const websocket = useRef<WebSocket | null>(null);
  
  const mutationPost = useMutation( {
    mutationFn: (value:IMessage) => Messages.post(value),
    onMutate: (data) => websocket.current && websocket.current.send(JSON.stringify({...data, event: 'post'})),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['messages']}),
  });
  
  const mutationDelete = useMutation( {
    mutationFn: (value:IMessage) => Messages.delete(value),
    onMutate: (data) => websocket.current && websocket.current.send(JSON.stringify({...data, event: 'delete'})),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['messages']}),
  });
  
  return { data, websocket, mutationDelete, mutationPost }
}