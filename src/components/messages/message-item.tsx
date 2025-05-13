'use client';

import { useState } from 'react';
import React from 'react';
import { PiPencil } from 'react-icons/pi';

import { UpdateInput } from './update-input';

type Message = {
  id: string;
  content: string;
};

type Props = {
  roomId: string;
  message: Message;
};

export const MessageItem = React.memo(({ roomId, message }: Props) => {
  const [toggleState, setToggleState] = useState(false);

  const handleToggleState = () => {
    setToggleState(!toggleState);
  };

  if (toggleState) {
    return (
      <UpdateInput
        roomId={roomId}
        message={message}
        setToggleState={setToggleState}
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
        {message.content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
});
