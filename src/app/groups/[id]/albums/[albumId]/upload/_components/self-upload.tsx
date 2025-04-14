import { UploadButton } from '@/components/messages/upload-button';
import { MessageInput } from '@/components/messages/message-input';
import { Image } from '@/components/messages/image';
import { SentMessage } from '@/components/messages/sent-message';
import { useMessageStore } from '@/store/useMessageStore';

type Props = {
  roomId: string;
  images: { dataUrl: string; file: File };
  onUpload: () => void;
};

export const SelfUpload = ({ roomId, images, onUpload }: Props) => {
  const hasMessages = useMessageStore((state) => state.hasMessages(roomId));

  return (
    <>
      <UploadButton disabled={!hasMessages} onUpload={onUpload} />
      <Image imageSrc={images.dataUrl} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} />
    </>
  );
};
