import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiMinus } from 'react-icons/fi';

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
  memberId: string;
  groupId: string;
  groupname: string;
  memberName: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertKickoutMember = ({
  memberId,
  groupId,
  groupname,
  memberName,
  setIsActive,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/backend/api/v1/groups/${groupId}/members/${memberId}`,
        {
          method: 'delete',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      return response.json();
    },
    onSuccess: () => {
      alert('그룹 내보내기 성공');
      setIsActive(false);
      queryClient.invalidateQueries({
        queryKey: ['groups', groupId, 'members'],
      });
    },
    onError: (error) => {
      console.log(error);
      alert('내보내기 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 삭제 버튼이 아닌 다른 곳을 누르면 삭제 버튼 비활성화
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !event.target.closest('.cancel-btn') &&
        !event.target.closest('.delete-btn') && // ✅ "delete-btn" 클래스를 가진 버튼이 부모인지 확인
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemoveMember = () => {
    mutation.mutate();
  };

  return (
    <div ref={containerRef}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            aria-haspopup="dialog"
            aria-label={`${memberName}님을 그룹에서 내보내기`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="delete-btn absolute -top-1 z-10 -right-1 inline-flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full size-8"
          >
            <FiMinus className="text-[28px] text-white" aria-hidden="true" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alertdialog-title"
          aria-describedby="alertdialog-description"
          className="py-[18px] w-[330px] h-[150px] rounded-[10px]"
        >
          <AlertDialogHeader>
            <AlertDialogTitle id="alertdialog-title" className="mb-0">
              {groupname}
            </AlertDialogTitle>
            <AlertDialogDescription
              id="alertdialog-description"
              className="text-gray-600"
            >
              그룹에서 <strong>{memberName}</strong>님을 내보내시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cancel-btn"
              onClick={() => {
                setIsActive(false);
              }}
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="delete-btn"
              onClick={() => {
                handleRemoveMember();
              }}
            >
              내보내기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
