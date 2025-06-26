// src/components/TripCourse.tsx

import { useState, useRef, useEffect, useCallback } from 'react';

// 이미지 파일 import (경로 수정하지 않음)
// import Fushimi from '/public/images/Fushimi-Inari- Shrine.png';
// import Kinkakuji from '/public/images/Kinkakuji.png';
// import Kiyomizudera from '/public/images/Kiyomizudera.png';
// import Nakagawa from '/public/images/Nakagawa-River.png';

/**
 * 상품 정보를 정의하는 인터페이스.
 */
interface IProduct {
  name: string;
  price: number;
}

// 스와이프를 인식할 최소 이동 거리 (픽셀)를 정의하는 상수입니다.
const SWIPE_THRESHOLD = 50;

/**
 * TripCourse 컴포넌트입니다.
 * 판매 중인 특정 상품 목록을 유동적인 터치/마우스 드래그 및 스냅 기능으로 표시합니다.
 * 이 컴포넌트가 이제 "판매 중인 상품" 섹션의 전체 구조를 담당합니다.
 *
 * @returns 렌더링된 TripCourse 컴포넌트.
 */
function TripCourse() {
  // 캐러셀에 표시될 상품 데이터 배열 (하드코딩된 데이터)
  const PRODUCTS: IProduct[] = [
    {
      name: '후시미 이나리 신사',
      price: 30000,
    },
    {
      name: '금각사',
      price: 20000,
    },
    {
      name: '청수사',
      price: 50000,
    },
    {
      name: '나카스 강',
      price: 44000,
    },
  ];

  // 현재 캐러셀에서 가장 왼쪽에 보이는(스냅된) 상품의 인덱스를 관리합니다.
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 드래그 상태를 추적하기 위한 Ref들 (렌더링을 유발하지 않고 값만 변경)
  const isDragging = useRef(false); // 현재 드래그 중인지 여부
  const startX = useRef(0); // 드래그 시작 시점의 X 좌표
  const currentTranslateRef = useRef(0); // 캐러셀의 현재 translateX 값을 실시간으로 추적
  const prevTranslateRef = useRef(0); // 드래그 시작 직전의 캐러셀 translateX 값

  // 개별 상품 아이템의 총 너비 (아이템 자체 너비 + 양쪽 마진)를 저장하는 State
  const [itemTotalWidth, setItemTotalWidth] = useState(0);
  // 첫 번째 상품 아이템에 대한 참조 (너비 측정을 위해 사용)
  const firstProductItemRef = useRef<HTMLDivElement>(null);
  // 캐러셀의 모든 아이템을 담고 transform이 적용될 DOM 요소에 대한 참조
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // --- 아이템 너비 측정 로직 ---
  useEffect(() => {
    const measureWidth = () => {
      if (firstProductItemRef.current) {
        const element = firstProductItemRef.current;
        const computedStyle = window.getComputedStyle(element);
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const marginRight = parseFloat(computedStyle.marginRight);
        setItemTotalWidth(element.offsetWidth + marginLeft + marginRight);
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    return () => window.removeEventListener('resize', measureWidth);
  }, [PRODUCTS.length]);

  // --- currentTranslateRef 값을 실제 DOM 요소의 'transform' 속성에 적용하는 함수 ---
  const applyTranslate = useCallback(() => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}px)`;
    }
  }, []);

  // --- 캐러셀 트랙의 'transition' CSS 속성을 설정하는 함수 ---
  const setCarouselTransition = useCallback((transition: string) => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = transition;
    }
  }, []);

  // --- 'currentIndex'가 변경될 때 캐러셀을 해당 위치로 스냅시키는 useEffect ---
  useEffect(() => {
    if (itemTotalWidth > 0 && carouselTrackRef.current) {
      const targetTranslate = -currentIndex * itemTotalWidth;
      currentTranslateRef.current = targetTranslate;
      setCarouselTransition('transform 0.3s ease-out'); // 스냅 시 부드러운 애니메이션 적용
      applyTranslate();
    }
  }, [currentIndex, itemTotalWidth, applyTranslate, setCarouselTransition]);

  // --- 드래그 시작 (터치/마우스) 공통 핸들러 ---
  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    prevTranslateRef.current = currentTranslateRef.current;
    setCarouselTransition('none'); // 드래그 중에는 애니메이션 제거
  };

  // --- 드래그 이동 (터치/마우스) 공통 핸들러 ---
  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const dragDistance = clientX - startX.current;
    let newTranslate = prevTranslateRef.current + dragDistance;

    const minTranslate = -(PRODUCTS.length - 1) * itemTotalWidth;
    const maxTranslate = 0;
    const elasticity = 0.2;

    if (newTranslate > maxTranslate) {
      newTranslate = maxTranslate + (newTranslate - maxTranslate) * elasticity;
    } else if (newTranslate < minTranslate) {
      newTranslate = minTranslate + (newTranslate - minTranslate) * elasticity;
    }

    currentTranslateRef.current = newTranslate;
    applyTranslate();
  };

  // --- 드래그 종료 (터치/마우스) 공통 핸들러 ---
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setCarouselTransition('transform 0.3s ease-out'); // 스냅을 위해 애니메이션 다시 적용

    const movedBy = currentTranslateRef.current - prevTranslateRef.current;

    if (Math.abs(movedBy) < SWIPE_THRESHOLD) {
      setCurrentIndex(currentIndex);
    } else {
      let snapToIndex;

      if (itemTotalWidth === 0) {
        snapToIndex = 0;
      } else {
        snapToIndex = Math.round(
          Math.abs(currentTranslateRef.current) / itemTotalWidth
        );

        if (movedBy < 0) {
          snapToIndex = Math.min(snapToIndex + 1, PRODUCTS.length - 1);
        } else {
          snapToIndex = Math.max(snapToIndex - 1, 0);
        }
        snapToIndex = Math.max(0, Math.min(snapToIndex, PRODUCTS.length - 1));
      }
      setCurrentIndex(snapToIndex);
    }
  };

  // --- 터치 이벤트 핸들러 ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };
  const handleTouchEnd = () => handleEnd();

  // --- 마우스 이벤트 핸들러 (데스크톱 드래그 기능을 위해) ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) =>
    handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.clientX);
  };
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleEnd();
    }
  };

  return (
    <div className="pl-4 py-5">
      <h1 className="text-base font-bold mb-4 text-left">사용자 추천 여행지</h1>

      {PRODUCTS.length === 0 ? (
        <div className="text-gray-600 p-4 border rounded-md text-center text-base">
          판매 중인 상품이 없습니다.
        </div>
      ) : (
        <div
          className="trip-course-container overflow-hidden relative w-full mx-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselTrackRef}
            className="product-carousel flex gap-[10px]"
          >
            {PRODUCTS.map((product, index) => (
              <div
                key={index}
                ref={index === 0 ? firstProductItemRef : null}
                className="product-item flex-shrink-0 flex flex-col items-start rounded-lg bg-white w-[140px]"
              >
                <img
                  src={'https://placehold.co/400'}
                  alt={product.name}
                  className="product-image w-full object-cover rounded mb-[6px] h-[90px]"
                />
                <div className="product-details text-left">
                  <h3 className="product-name text-sm mb-1">{product.name}</h3>
                  <p className="product-price text-xs text-orange-600">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TripCourse;
