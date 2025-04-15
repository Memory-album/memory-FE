'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { addNewAlbum } from '@/lib/albums/addNewAlbum';
import useUserStore from '@/store/useUserInfo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddAlbum = () => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    groupId: userInfo?.currentGroupId,
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const albumData = {
        title: formData.title,
        theme: formData.theme,
        groupId: Number(formData.groupId),
        description: formData.description || '',
      };

      const response = await addNewAlbum(albumData);
      if (response.result === 'success') {
        alert('앨범이 성공적으로 추가되었습니다.');
        router.push('/albums');
      }
    } catch (error) {
      alert('앨범 추가에 실패했습니다.');
      console.error('Error adding album:', error);
    }
  };

  return (
    <div className="sm:w-[500px] w-full mx-auto ForGnbpaddingTop ForFnbmarginBottom">
      <div className="flex flex-col justify-center items-center mt-10">
        <div>
          <p className="text-2xl font-bold w-fit mb-4">앨범 이름</p>
          <FormInput
            type="text"
            id="title"
            placeholder="이름을 입력해주세요."
            action=""
            method=""
            errorMessage="이름을 입력해주세요."
            errorMessageMarginTop="8px"
            errorMessageSize="14px"
            Inputwidth="315px"
            InputTextSize="20px"
            InputLineHeight="36px"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold w-fit mb-4">테마</p>
          <FormInput
            type="text"
            id="theme"
            placeholder="테마를 입력해주세요."
            action=""
            method=""
            errorMessage="테마를 입력해주세요."
            errorMessageMarginTop="8px"
            errorMessageSize="14px"
            Inputwidth="315px"
            InputTextSize="20px"
            InputLineHeight="36px"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold w-fit mb-4">설명</p>
          <FormInput
            type="text"
            id="description"
            placeholder="테마를 입력해주세요."
            action=""
            method=""
            required={false}
            errorMessage="설명을 입력해주세요."
            errorMessageMarginTop="8px"
            errorMessageSize="14px"
            Inputwidth="315px"
            InputTextSize="20px"
            InputLineHeight="36px"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button variant="default" onClick={handleSubmit}>
            추가
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAlbum;
