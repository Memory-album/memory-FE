'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import '../_components/theme.css';

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const ThemeName = ['시니어 테마', '자녀 성장 테마', '커플 테마'];
const ThemeInfo = [
  '가족과 함께하는 소중한 순간들을 기록하고 공유하세요. 어르신들의 일상과 특별한 순간들을 담아내는 공간입니다',
  '아이의 성장과정을 기록하고 가족들과 공유하세요. 첫 걸음마부터 특별한 순간까지, 모든 소중한 기억을 담을 수 있습니다.',
  '연인과의 특별한 순간들을 기록하고 공유하세요. 데이트, 기념일 등 둘만의 소중한 이야기를 담는 공간입니다.',
];

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Theme = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: true,
    loop: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(
        '.ThemeEmbla__slide__number',
      ) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0.7, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  const onSlideChange = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('select', onSlideChange);
  }, [emblaApi, tweenScale, onSlideChange]);

  return (
    <section className="ThemeEmbla">
      <div ref={emblaRef} className="ThemeEmbla__viewport">
        <div className="ThemeEmbla__container">
          {/* 그룹 이미지, 이름 설정 */}
          <div
            className="ThemeEmbla__slide w-[100px] p-4 flex flex-col items-center"
            key={0}
          >
            <div className="ThemeEmbla__slide__number bg-red-500 w-[152px] h-[152px]"></div>
          </div>

          {/* 앨범 테마 선택 */}
          <div
            className="ThemeEmbla__slide w-[100px] p-4 flex flex-col items-center"
            key={1}
          >
            <div className="ThemeEmbla__slide__number bg-blue-500 w-[152px] h-[152px]"></div>
          </div>

          {/* 초대코드 단계 */}
          <div
            className="ThemeEmbla__slide w-[100px] p-4 flex flex-col items-center"
            key={2}
          >
            <div className="ThemeEmbla__slide__number bg-green-500 w-[152px] h-[152px]"></div>
          </div>
        </div>
        <div className="mt-[10px]">
          <p className="font-semibold text-[20px] text-[#5F5FFF] mb-[5px]">
            {ThemeName[currentIndex]}
          </p>
          <p className="font-semibold text-[16px] text-[#6897FF]">
            {ThemeInfo[currentIndex]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Theme;
