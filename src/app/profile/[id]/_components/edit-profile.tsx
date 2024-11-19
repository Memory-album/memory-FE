import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiEdit } from 'react-icons/fi';

type Props = {
  name: string;
  role: string;
};

export const EditProfile = ({ name, role }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FiEdit className="relative text-[25px] top-[-2px] cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="pb-[10px] w-[330px] rounded-[10px]">
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 수정</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div>
            <Label htmlFor="name" className="font-semibold">
              이름
            </Label>
            <Input
              id="username"
              placeholder="이름"
              className="mt-1 mb-2 rounded-[10px] shadow-none"
            />
          </div>
          <div>
            <Label htmlFor="role" className="font-semibold">
              역할
            </Label>
            <Input
              id="role"
              placeholder="예) 남편, 딸, 고모부"
              className="mt-1 mb-6 rounded-[10px] shadow-none"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>수정</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
