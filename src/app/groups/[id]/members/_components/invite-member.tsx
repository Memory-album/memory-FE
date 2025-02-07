import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const InviteMember = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[330px] rounded-[10px]"
      >
        <DialogHeader className="m-auto">
          <DialogTitle className="mt-2">
            앨범을 공유할 가족을 초대해보세요!
          </DialogTitle>
          <DialogDescription className="text-center">
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
