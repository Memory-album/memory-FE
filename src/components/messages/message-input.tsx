import { ChangeEvent, useState } from 'react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';
import { MdKeyboardVoice } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

import { Button } from '@/components/ui/button';

import { useMessageStore } from '@/store/useMessageStore';
import { useViewStore } from '@/store/useViewStore';

type Props = {
  roomId: string;
};

export const MessageInput = ({ roomId }: Props) => {
  const [content, setContent] = useState('');
  const { uploadMessage } = useMessageStore();
  const { setView } = useViewStore();

  const handleSubmit = () => {
    if (content.trim() === '') return;

    uploadMessage(roomId, { id: uuidv4(), content });
    setContent('');
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isContentEmpty =
    content.trim() === '' ||
    content.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 w-full sm:w-[500px] sm:m-auto flex justify-center items-center bg-white">
      {roomId === 'owner' && (
        <Button
          className="size-9 mr-[14px] bg-[#699BF7] text-white rounded-full [&_svg]:size-6"
          onClick={() => setView('recording')}
          type="button"
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
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          onClick={handleSubmit}
          className="absolute bottom-[10px] right-2 w-11 h-8 rounded-[20px] bg-[#4848F9] text-white [&_svg]:size-5 cursor-pointer"
          disabled={isContentEmpty}
        >
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};
