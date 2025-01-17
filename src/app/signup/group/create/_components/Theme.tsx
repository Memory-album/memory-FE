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

const ThemeName = ['테마1', '테마2', '테마3'];
const ThemeInfo = [
  '1은 이거고 저거고 이러저거 어쩌구저쩌구',
  '2는 이거랑 저러랑 모시깽이',
  '3은 뭐라하지 음 그냥 머 그런거거',
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
