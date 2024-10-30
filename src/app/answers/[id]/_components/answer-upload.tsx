import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from '@/components/messages/message-input';
import { Image } from '@/components/messages/image';
import { ReceivedMessage } from '@/components/messages/received-message';
import { SentMessage } from '@/components/messages/sent-message';

type Message = {
  id: number;
  content: string;
};

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setCurrentView: (view: string) => void;
};

export const AnswerUpload = ({
  messages,
  setMessages,
  setCurrentView,
}: Props) => {
  return (
    <>
      <UploadButton />
      <div className="overflow-y-auto mb-24">
        <Image />
        <ReceivedMessage />
        <SentMessage messages={messages} setMessages={setMessages} />
      </div>
      <MessageInput
        setCurrentView={setCurrentView}
        onUploadMessage={setMessages}
      />
    </>
  );
};
