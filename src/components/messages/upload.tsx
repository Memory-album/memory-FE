import { Alert } from '@/components/messages/alert';
import { Image } from '@/components/messages/image';
import { ReceivedMessage } from '@/components/messages/received-message';
import { SentMessage } from '@/components/messages/sent-message';
import { MessageInput } from '@/components/messages/message-input';
import { useMessageStore } from '@/store/useMessageStore';

interface QuestionProps {
  id: string;
  question: string;
  category?: string;
  level?: number;
}

interface ResponseDataProps {
  albumId: string;
  imageUrl: string;
  mediaId: string;
  questions: QuestionProps[];
  userId: string;
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
      <Image imageSrc={responseData.imageUrl} />
      <ReceivedMessage questions={responseData.questions} />
      <SentMessage roomId={roomId} />
      <MessageInput roomId={roomId} />
    </>
  );
};
