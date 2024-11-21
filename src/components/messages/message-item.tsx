'use client';

import { useState } from 'react';
import { UpdateInput } from './update-input';
import { PiPencil } from 'react-icons/pi';

type Message = {
  id: number;
  content: string;
};

type Props = {
  message: Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const MessageItem = ({ message, setMessages }: Props) => {
  const [toggleState, setToggleState] = useState(false);

  const handleToggleState = () => {
    setToggleState(!toggleState);
  };

  if (toggleState) {
    return (
      <UpdateInput
        message={message}
        setToggleState={setToggleState}
        setMessages={setMessages}
      />
    );
  }

  return (
    <div className="flex mr-4">
      <PiPencil
        className="text-[#85B6FF] text-[17px] cursor-pointer"
        onClick={handleToggleState}
      />
      <p className="mb-1 py-3 px-[17px] max-w-[240px] bg-[#4848F9] rounded-[20px] rounded-tr-none text-white text-base">
        {message.content}
      </p>
    </div>
  );
};
