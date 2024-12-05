import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from '@/components/messages/message-input';
import { Image } from '@/components/messages/image';
import { SentMessage } from '@/components/messages/sent-message';
import { useHasMessage } from '@/lib/messages/useHasMessage';
import { useRouter } from 'next/navigation';
import { useMessageStore } from '@/store/useMessageStore';

type Props = {
  roomId: string;
  imageSrc: string;
};

export const SelfUpload = ({ roomId, imageSrc }: Props) => {
  const { hasMessage, checkMessages } = useHasMessage(roomId);
  const router = useRouter();
  const { deleteRoom } = useMessageStore();

  const handleUpload = () => {
    router.replace('/home');
    deleteRoom(roomId);
  };
  return (
    <>
      <UploadButton disabled={!hasMessage} onUpload={handleUpload} />
      <Image imageSrc={imageSrc} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} onSendMessage={checkMessages} />
    </>
  );
};
