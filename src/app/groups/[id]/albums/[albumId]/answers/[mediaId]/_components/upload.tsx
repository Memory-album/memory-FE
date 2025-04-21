import { Alert } from '@/components/messages/alert';
import { Image } from '@/components/messages/image';
import { SentMessage } from '@/components/messages/sent-message';
import { MessageInput } from '@/components/messages/message-input';
import { useMessageStore } from '@/store/useMessageStore';
import { ReceivedMessage } from './received-message';

interface QuestionProps {
  category: string;
  content: string;
  mediaId: string;
  id: string;
  imgUrl: string;
  isPrivate: boolean;
  level: number;
  theme: string;
  uploader: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
}

interface ResponseDataProps {
  questions: QuestionProps[];
}

interface Props {
  roomId: string;
  onUploadAlbum: () => void;
  responseData: ResponseDataProps;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Upload = ({
  roomId,
  onUploadAlbum,
  responseData,
  isLoading,
  open,
  onOpenChange,
}: Props) => {
  const hasMessages = useMessageStore((state) => state.hasMessages(roomId));
  return (
    <>
      <div className="sticky top-[110px] right-3 flex justify-end mb-6">
        <Alert
          description="질문과 답변으로 스토리를 생성하고 있어요"
          buttonValue="저장"
          buttonClassName="disabled:bg-[#DAE2FF] w-[60px] h-[40px]"
          disabled={!hasMessages}
          onClick={onUploadAlbum}
          isLoading={isLoading}
          open={open}
          onOpenChange={onOpenChange}
        />
      </div>
      <Image imageSrc={responseData.questions[0].imgUrl} />
      <ReceivedMessage questions={responseData.questions} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} />
    </>
  );
};
