import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { Button } from '@/components/ui/button';
import { useMessageStore } from '@/store/useMessageStore';

type Message = {
  id: string;
  content: string;
};

type Props = {
  roomId: string;
  message: Message;
  setToggleState: (state: boolean) => void;
};

export const UpdateInput = ({ roomId, message, setToggleState }: Props) => {
  const [input, setInput] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updateMessage } = useMessageStore();

  useEffect(() => {
    if (textareaRef.current) {
      const length = message.content.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  const handleCancelUpdate = () => {
    setToggleState(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleUpdate = () => {
    updateMessage(roomId, message.id, input);
    setToggleState(false);
  };

  return (
    <div className="py-[14px] px-[17px] w-[90%] mx-auto mb-1 bg-[#7878FF] rounded-[20px]">
      <TextareaAutosize
        rows={3}
        ref={textareaRef}
        className="w-full bg-inherit focus-visible:outline-none text-white resize-none"
        defaultValue={message.content}
        onChange={(e) => handleChangeInput(e)}
      ></TextareaAutosize>
      <div className="flex justify-end items-center gap-[4px] mt-3">
        <Button
          className="py-[1px] px-3 w-12 h-7 bg-white text-black text-xs rounded-[15px] hover:bg-gray-200"
          onClick={handleCancelUpdate}
        >
          취소
        </Button>
        <Button
          className="py-[1px] px-3 w-12 h-7 bg-black text-white text-xs rounded-[15px] hover:bg-black"
          onClick={handleUpdate}
        >
          보내기
        </Button>
      </div>
    </div>
  );
};
