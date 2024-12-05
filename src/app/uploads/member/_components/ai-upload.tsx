import { ReceivedMessage } from '@/components/messages/received-message';
import { UploadButton } from '@/components/messages/upload-button';
import { Image } from '@/components/messages/image';
import { useRouter } from 'next/navigation';

type Props = {
  imageSrc: string;
};

export const AiUpload = ({ imageSrc }: Props) => {
  const router = useRouter();
  const handleUpload = () => {
    router.replace('/home');
  };
  return (
    <>
      <UploadButton disabled={false} onUpload={handleUpload} />
      <div className="overflow-y-auto mb-24 pl-[30px]">
        <Image imageSrc={imageSrc} />
        <ReceivedMessage questions={['질문 데이터']} />
      </div>
    </>
  );
};
