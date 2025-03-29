import { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { MdKeyboardVoice } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { useMessageStore } from '@/store/useMessageStore';
import React from 'react';
import { useViewStore } from '@/store/useViewStore';

type Props = {
  roomId: string;
  onSendMessage: () => void;
};

export const MessageInput = ({ roomId, onSendMessage }: Props) => {
  const [content, setContent] = useState('');
  const { uploadMessages } = useMessageStore();
  const { setView } = useViewStore();

  const handleSubmit = () => {
    uploadMessages(roomId, { id: uuidv4(), content });
    setContent('');
    onSendMessage();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 w-full sm:w-[500px] sm:m-auto flex justify-center items-center bg-white">
      {roomId === 'owner' && (
        <Button
          className="size-9 mr-[14px] bg-[#699BF7] text-white rounded-full [&_svg]:size-6"
          onClick={() => setView('recording')}
        >
          <MdKeyboardVoice />
        </Button>
      )}
      <div className="grow relative max-h-[150px] top-1">
        <TextareaAutosize
          className="pl-3 pr-[50px] py-[6px] w-full min-h-[38px] max-h-[100px] border border-input bg-transparent rounded-[20px] focus-visible:outline-none text-base resize-none"
          placeholder="답장 보내기..."
          value={content}
          onChange={handleChangeInput}
        />
        <Button
          type="button"
          onClick={handleSubmit}
          className="absolute bottom-[10px] right-2 w-11 h-8 rounded-[20px] bg-[#4848F9] text-white [&_svg]:size-5 cursor-pointer"
          disabled={
            content === '' ||
            content.replace(/<(.|\n)*?>/g, '').trim().length === 0
          }
        >
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};
