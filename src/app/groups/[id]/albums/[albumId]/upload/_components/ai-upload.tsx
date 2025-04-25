import { useRouter } from 'next/navigation';

import { ReceivedMessage } from '@/components/messages/received-message';
import { UploadButton } from '@/components/messages/upload-button';
import { Image } from '@/components/messages/image';

type Props = {
  responseData: {
    albumId: string;
    imageUrl: string;
    mediaId: string;
    questions: QuestionProps[];
    userId: string;
  };
};
interface QuestionProps {
  id: string;
  question: string;
  category?: string;
  level?: number;
}

export const AiUpload = ({ responseData }: Props) => {
  const router = useRouter();
  const handleUpload = () => {
    router.replace('/home');
  };

  return (
    <>
      <UploadButton disabled={false} onUpload={handleUpload} />
      <div className="overflow-y-auto mb-24 pl-[30px]">
        {/* {data.images.map((image, index) => (
          <Image key={index} imageSrc={image} />
        ))} */}
        <Image imageSrc={responseData.imageUrl} />
        <ReceivedMessage questions={responseData.questions} />
      </div>
    </>
  );
};
