import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GoPlus } from 'react-icons/go';
import { CommonButton } from './common-button';

export const AddGroup = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="mt-0 size-[150px] flex items-center justify-center border-4 border-[#969696] text-[#969696] hover:text-[#969696]/80 hover:border-[#969696]/80 rounded-[14px]">
          <GoPlus className="size-[100px]" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[330px] py-[55px] rounded-[10px] sm:rounded-[14px]">
        <DialogHeader>
          <DialogTitle className="hidden">그룹 참여</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center text-[18px] text-[#4848F9] font-bold">
          <CommonButton className="mr-[30px]" link="/invite">
            그룹 참여하기
          </CommonButton>
          <CommonButton link="/groups/create">그룹 만들기</CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
