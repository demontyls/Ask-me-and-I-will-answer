import React, { FC } from 'react';
import { IMessage } from '../../interface/interface';
import { useQueryProcessing } from '../../../hooks/useQueryProcessing';

interface IMessageComponent {
  data: IMessage;
}
const Message:FC<IMessageComponent> = ({ data }) => {
  const { mutationDelete } = useQueryProcessing();
  return (
    <li key={data.id} className="message">
      {data.content}
      <div>
        <button className="btn btn-sm btn-danger p-0" onClick={ () => mutationDelete.mutate({...data})}>x</button>
      </div>
    </li>
  );
};

export default Message;