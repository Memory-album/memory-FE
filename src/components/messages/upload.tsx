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
  imageSrc: string;
};

export const Upload = ({
  messages,
  setMessages,
  setCurrentView,
  imageSrc,
}: Props) => {
  return (
    <>
      <UploadButton />
      <div className="overflow-y-auto mb-24">
        <Image imageSrc={imageSrc} />
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
