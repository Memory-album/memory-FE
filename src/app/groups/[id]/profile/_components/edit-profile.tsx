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
import { Input } from '@/components/ui/input';
import { FiEdit } from 'react-icons/fi';

type Props = {
  name: string;
};

export const EditProfile = ({ name }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FiEdit className="relative text-[25px] top-[-2px] cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="pb-[10px] w-[330px] rounded-[10px]">
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 이름 변경</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div>
            <Input
              id="username"
              placeholder="이름"
              className="mt-1 mb-2 rounded-[10px] shadow-none"
            />
          </div>
        </div>
        <AlertDialogDescription className="hidden">
          프로필 이름 변경창입니다.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>변경</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
