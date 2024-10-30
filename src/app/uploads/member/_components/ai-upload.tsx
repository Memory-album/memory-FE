import { ReceivedMessage } from '@/components/messages/received-message';
import { UploadButton } from '@/components/messages/upload-button';
import { Image } from '@/components/messages/image';

export const AiUpload = () => {
  return (
    <>
      <UploadButton />
      <div className="overflow-y-auto mb-24 pl-[30px]">
        <Image />
        <ReceivedMessage />
      </div>
    </>
  );
};
