import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CiSquarePlus } from 'react-icons/ci';
import { CommonButton } from './common-button';

export const AddGroup = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CiSquarePlus className="size-[148px] sm:size-[200px] text-[#969696]" />
        <p className="text-base text-[#4C4B4B] text-center">그룹 추가하기</p>
      </DialogTrigger>
      <DialogContent className="w-[330px] py-[55px] rounded-[10px] sm:rounded-[10px]">
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
