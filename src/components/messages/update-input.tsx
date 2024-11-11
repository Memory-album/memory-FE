import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { MdKeyboardVoice } from 'react-icons/md';

type Message = {
  id: number;
  content: string;
};

type Props = {
  message: Message;
  setToggleState: (state: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const UpdateInput = ({
  message,
  setMessages,
  setToggleState,
}: Props) => {
  const [input, setInput] = useState(message.content);

  const handleCancelUpdate = () => {
    setToggleState(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleUpdate = () => {
    setMessages((prevState) =>
      prevState.map((state) =>
        state.id === message.id ? { ...message, content: input } : { ...state },
      ),
    );
    setToggleState(false);
  };

  return (
    <div className="py-[14px] px-[17px] mb-1 w-full bg-[#7878FF] rounded-[20px]">
      <textarea
        rows={3}
        className="w-full bg-inherit focus-visible:outline-none text-white resize-none"
        defaultValue={message.content}
        onChange={(e) => handleChangeInput(e)}
      ></textarea>
      <div className="flex justify-end items-center gap-[4px] mt-3">
        <MdKeyboardVoice className="mr-1 bg-white rounded-full text-[#7878FF] text-[24px]" />
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
