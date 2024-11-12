import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CiSquarePlus } from 'react-icons/ci';

export const InviteMember = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CiSquarePlus className="size-[103px] sm:size-[150px] text-[#969696]" />
        <p className="text-base text-[#4C4B4B] text-center">멤버 초대하기</p>
      </DialogTrigger>
      <DialogContent className="w-[330px] rounded-[10px]">
        <DialogHeader>
          <DialogTitle className="mt-2">
            앨범을 공유할 가족을 초대해보세요!
          </DialogTitle>
          <DialogDescription>
            아래 코드로 멤버를 초대할 수 있어요
          </DialogDescription>
        </DialogHeader>
        <div className="text-center text-[22px] text-[#4848F9] font-bold">
          123456
        </div>
      </DialogContent>
    </Dialog>
  );
};
