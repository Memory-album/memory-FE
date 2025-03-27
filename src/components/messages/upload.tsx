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
  data: {
    albumId: string;
    imageUrl: string;
    mediaId: string;
    questions: QuestionProps[];
    userId: string;
  };
};

type QuestionProps = {
  question: string;
  category?: string;
  level?: number;
};

export const Upload = ({ roomId, data }: Props) => {
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
      {/* {data.imageUrl.map((image, index) => (
        <Image key={index} imageSrc={image} />
      ))} */}
      <Image imageSrc={data.imageUrl} />
      <ReceivedMessage questions={data.questions} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} onSendMessage={checkMessages} />
    </>
  );
};
