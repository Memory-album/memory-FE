import Link from 'next/link';

import { Menu11Icon } from 'hugeicons-react';
import { CgClose } from 'react-icons/cg';
import { BubbleChatNotificationIcon } from 'hugeicons-react';
import { BubbleChatQuestionIcon } from 'hugeicons-react';
import { PiClockCounterClockwiseLight } from 'react-icons/pi';
import { BookOpen02Icon } from 'hugeicons-react';
import { Settings02Icon } from 'hugeicons-react';
import { UserGroupIcon } from 'hugeicons-react';
import { AddTeamIcon } from 'hugeicons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Gnb = () => {
  return (
    <header className="w-full h-[102px] fixed top-0 left-0 right-0 bg-[#fafcffe5] z-50">
      <div className="w-full h-[78px] mt-6 flex justify-between items-center">
        <div className="ml-4 font-bold text-lg text-[#8FB6FF]">앨범</div>
        <button className="mr-3 p-1 rounded-xl active:bg-[#E3EDFF]">
          <Menu11Icon size={30} color="#8FB6FF" />
        </button>
      </div>
      <div className="bg-black/[.28] w-screen h-screen fixed top-0">
        <div className="w-[203px] h-screen fixed top-0 right-0 rounded-l-2xl bg-white">
          <div className="mt-[52px] ml-4 mr-5">
            <div className="flex justify-end">
              <CgClose className="w-5 h-5 color-[#6B6B6B]" />
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="font-semibold text-lg">사이트 이름</p>
              <Avatar className="w-7 h-7 text-white">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3 mt-[9px]">
              <div className="mt-[29px]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xs text-[#626262]">앨범</p>
                  <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
                </div>
                <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[3px]">
                  <div className="flex justify-center items-center flex-col">
                    <BookOpen02Icon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      전체보기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <BubbleChatNotificationIcon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      답변하기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <BubbleChatQuestionIcon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      질문하기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <PiClockCounterClockwiseLight color="#85B6FF" size={26} />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      최근컨텐츠
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-[29px]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xs text-[#626262]">그룹</p>
                  <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
                </div>
                <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[3px]">
                  <div className="flex justify-center items-center flex-col">
                    <BookOpen02Icon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      그룹 보기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <BubbleChatNotificationIcon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      참여하기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <BubbleChatQuestionIcon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      그룹 만들기
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <PiClockCounterClockwiseLight color="#85B6FF" size={26} />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      초대하기
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-[29px]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xs text-[#626262]">설정</p>
                  <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
                </div>
                <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[3px]">
                  <div className="flex justify-center items-center flex-col">
                    <Settings02Icon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      설정하기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Gnb;
