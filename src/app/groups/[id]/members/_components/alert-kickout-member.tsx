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
import { useEffect, useRef } from 'react';
import { FiMinus } from 'react-icons/fi';

type Props = {
  groupname: string;
  username: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertKickoutMember = ({
  groupname,
  username,
  setIsActive,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 삭제 버튼이 아닌 다른 곳을 누르면 삭제 버튼 비활성화
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !event.target.closest('.delete-btn') && // ✅ "delete-btn" 클래스를 가진 버튼이 부모인지 확인
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div ref={containerRef}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="delete-btn absolute -top-1 z-10 -right-1 inline-flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full size-8"
          >
            <FiMinus className="text-[28px] text-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="py-[18px] w-[330px] h-[150px] rounded-[10px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-0">{groupname}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              그룹에서 <strong>{username}</strong>님을 내보내시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsActive(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsActive(false)}>
              내보내기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
