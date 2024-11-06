import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { BiDoorOpen } from 'react-icons/bi';

export const AlertLeaveGroup = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Link href="#" className="flex items-center">
          <BiDoorOpen className="mr-[15px] text-[28px]" />
          <span>그룹에서 나가기</span>
        </Link>
      </AlertDialogTrigger>
      <AlertDialogContent className="pb-[10px] w-[330px] h-[150px] rounded-[10px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-0 font-semibold">
            정말로 그룹에서 나가시겠어요?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            더이상 그룹의 앨범을 볼 수 없어요
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>나가기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
