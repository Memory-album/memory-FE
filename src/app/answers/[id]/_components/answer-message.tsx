'use client';

import { useState } from 'react';
import { UpdateInput } from './update-input';
import { PiPencil } from 'react-icons/pi';

type Props = {
  message: string;
};

export const AnswerMessage = ({ message }: Props) => {
  const [toggleState, setToggleState] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(message);

  const handleToggleState = () => {
    setToggleState(!toggleState);
  };

  if (toggleState) {
    return (
      <UpdateInput
        message={updateMessage}
        setToggleState={setToggleState}
        setUpdateMessage={setUpdateMessage}
      />
    );
  }

  return (
    <div className="flex">
      <PiPencil
        className="text-[#85B6FF] text-[17px] cursor-pointer"
        onClick={handleToggleState}
      />
      <p className="mb-1 py-3 px-[17px] max-w-[240px] bg-[#4848F9] rounded-[20px] rounded-tr-none text-white text-base">
        {updateMessage}
      </p>
    </div>
  );
};
