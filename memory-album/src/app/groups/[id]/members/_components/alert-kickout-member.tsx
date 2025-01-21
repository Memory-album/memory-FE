import { Item } from '@/app/groups/_components/item';
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

type Props = {
  classNames?: string;
  image?: string;
  name: string;
};

export const AlertKickoutMember = ({ image, name }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Item
          name={name}
          image={image}
          classNames="size-[103px] sm:size-[150px] cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="py-[18px] w-[330px] h-[150px] rounded-[10px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-0">미니언즈 모임</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            그룹에서 <strong>{name}</strong>님을 내보내시겠어요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>내보내기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
