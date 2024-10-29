import { useState } from 'react';

import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from './message-input';
import { Image } from '@/components/messages/image';
import { ReceivedMessage } from '@/components/messages/received-message';
import { SentMessage } from '@/components/messages/sent-message';

type Props = {
  messages: string[];
  setMessages: (messages: string[]) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
};
export const AnswerUpload = ({
  messages,
  setMessages,
  currentView,
  setCurrentView,
}: Props) => {
  return (
    <>
      <UploadButton />
      <div className="overflow-y-auto mb-24">
        <Image />
        <ReceivedMessage />
        <SentMessage messages={messages} />
      </div>
      {currentView === 'input' && (
        <MessageInput
          setCurrentView={setCurrentView}
          onUploadMessage={setMessages}
        />
      )}
    </>
  );
};
