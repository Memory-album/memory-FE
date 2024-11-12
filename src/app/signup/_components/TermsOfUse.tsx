import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TermsOfUse = ({ isOpen, onClose }: Props) => {
  const [terms, setTerms] = useState<string>('');

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('/약관.txt');
        if (response.ok) {
          const text = await response.text();
          setTerms(text);
        } else {
          setTerms('약관을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setTerms('약관을 불러오는데 오류가 발생했습니다.');
      }
    };

    if (isOpen) {
      fetchTerms();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center h-screen z-10">
      {isOpen && (
        <div className="w-screen h-screen fixed top-0" onClick={onClose}></div>
      )}
      <div className="bg-white p-6 rounded-[10px] w-[90%] max-w-lg h-[450px] whitespace-pre-line overflow-auto z-20">
        <p className="text-[20px] font-semibold text-[#4848F9] mb-[15px]">
          개인정보 수집 이용 약관
        </p>
        <p className="mb-[45px]">{terms}</p>
        <div className="w-fit m-auto">
          <button
            className="bg-[#4848F9] text-white py-2 px-[20px] rounded"
            onClick={onClose}
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
