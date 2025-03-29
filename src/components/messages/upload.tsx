import { useEffect } from 'react';

import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from '@/components/messages/message-input';
import { Image } from '@/components/messages/image';
import { ReceivedMessage } from '@/components/messages/received-message';
import { SentMessage } from '@/components/messages/sent-message';
import { useHasMessage } from '@/lib/messages/useHasMessage';

type Props = {
  roomId: string;
  onUploadAlbum: () => void;
  responseData: {
    albumId: string;
    imageUrl: string;
    mediaId: string;
    questions: QuestionProps[];
    userId: string;
  };
  requestData?: string;
};

type QuestionProps = {
  id: string;
  question: string;
  category?: string;
  level?: number;
};

export const Upload = ({ roomId, onUploadAlbum, responseData }: Props) => {
  const { hasMessage, checkMessages } = useHasMessage(roomId);

  useEffect(() => {
    checkMessages();
  }, []);

  return (
    <>
      <UploadButton disabled={!hasMessage} onUpload={onUploadAlbum} />
      {/* {data.imageUrl.map((image, index) => (
        <Image key={index} imageSrc={image} />
      ))} */}
      <Image imageSrc={responseData.imageUrl} />
      <ReceivedMessage questions={responseData.questions} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} onSendMessage={checkMessages} />
    </>
  );
};
