import { useEffect } from 'react';

import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from '@/components/messages/message-input';
import { Image } from '@/components/messages/image';
import { ReceivedMessage } from '@/components/messages/received-message';
import { SentMessage } from '@/components/messages/sent-message';
import { useHasMessage } from '@/lib/messages/useHasMessage';
import { useMessageStore } from '@/store/useMessageStore';
import { useRouter } from 'next/navigation';

type Props = {
  roomId: string;
  imageSrc: string;
  questions: string[];
};

export const Upload = ({ imageSrc, roomId, questions }: Props) => {
  const { hasMessage, checkMessages } = useHasMessage(roomId);
  const { deleteRoom } = useMessageStore();
  const router = useRouter();

  useEffect(() => {
    checkMessages();
  }, []);

  const handleUpload = () => {
    router.replace('/home');
    deleteRoom(roomId);
  };

  return (
    <>
      <UploadButton disabled={!hasMessage} onUpload={handleUpload} />
      <Image imageSrc={imageSrc} />
      <ReceivedMessage questions={questions} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} onSendMessage={checkMessages} />
    </>
  );
};
