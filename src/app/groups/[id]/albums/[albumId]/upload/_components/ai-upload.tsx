import { ReceivedMessage } from '@/components/messages/received-message';
import { UploadButton } from '@/components/messages/upload-button';
import { Image } from '@/components/messages/image';
import { useRouter } from 'next/navigation';

type Props = {
  data: {
    albumId: string;
    imageUrl: string;
    mediaId: string;
    questions: QuestionProps[];
    userId: string;
  };
};
interface QuestionProps {
  question: string;
  category?: string;
  level?: number;
}

export const AiUpload = ({ data }: Props) => {
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
        <Image imageSrc={data.imageUrl} />
        <ReceivedMessage questions={data.questions} />
      </div>
    </>
  );
};
