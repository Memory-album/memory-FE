import { ReceivedMessage } from '@/components/messages/received-message';
import { UploadButton } from '@/components/messages/upload-button';
import { Image } from '@/components/messages/image';

type Props = {
  imageSrc: string;
};

export const AiUpload = ({ imageSrc }: Props) => {
  return (
    <>
      <UploadButton disabled={false} />
      <div className="overflow-y-auto mb-24 pl-[30px]">
        <Image imageSrc={imageSrc} />
        <ReceivedMessage />
      </div>
    </>
  );
};
