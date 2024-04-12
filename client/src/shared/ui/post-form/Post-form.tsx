import React, { useRef } from 'react';
import { useQueryProcessing } from '../../../hooks/useQueryProcessing';

const PostForm = () => {
  const { mutationPost } = useQueryProcessing();
  const messageRef = useRef<HTMLInputElement>(null);
  const handlerSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (messageRef.current && messageRef.current.value) {
      mutationPost.mutate({
        content: messageRef.current.value,
        id: new Date().getTime().toString()
      });
      messageRef.current.value = '';
    }
  }
  
  return (
    <form>
      <div className="d-flex gap-3">
        <input ref={messageRef} type="text" className="form-control"/>
        <button className="btn btn-primary" type={"submit"} onClick={(e)=> handlerSendMessage(e)}>
          Отправить
        </button>
      </div>
    </form>
  );
};

export default PostForm;