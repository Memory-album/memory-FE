import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { CopyIcon } from 'lucide-react';

export const InviteCodeDialog = ({
  inviteCode,
  children,
}: {
  inviteCode: string;
  children: React.ReactNode;
}) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => alert('코드가 복사되었습니다!'));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[450px] flex flex-col items-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>앨범을 공유할 가족을 초대해보세요!</DialogTitle>
          <DialogDescription className="text-[#8C8989]">
            아래 코드로 멤버를 초대할 수 있어요.
          </DialogDescription>
        </DialogHeader>
        <strong className="text-4xl text-[#4848F9]">{inviteCode}</strong>
        <Button
          onClick={handleCopy}
          className="w-fit text-base bg-transparent hover:bg-transparent hover:opacity-80 border border-blue-100 text-black"
        >
          Copy link <CopyIcon className="size-4 ml-2" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
