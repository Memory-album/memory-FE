import { SaveButton } from './save-button';
import { AnswerContent } from './answer-content';
import { AnswerInput } from './answer-input';
import { useState } from 'react';

type Props = {
  currentView: (view: string) => void;
};
export const AnswerUpload = ({ currentView }: Props) => {
  const [messages, setMessages] = useState([
    '모르겠는데',
    '반찬 보내게 주소나 불러',
  ]);

  return (
    <>
      <SaveButton />
      <AnswerContent messages={messages} />
      <AnswerInput currentView={currentView} onUploadMessage={setMessages} />
    </>
  );
};
