// src/components/TripCourse.tsx

import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '../../../utils/auth';
// 👇 productApi.ts에서 IProduct를 임포트합니다.
import { fetchProductsByAccount } from '../../../api/productApi';

interface ITripCourse {
  pageType: string;
  urlAccountname?: string;
}

// 스와이프를 인식할 최소 이동 거리 (픽셀)
const SWIPE_THRESHOLD = 50;

/**
 * TripCourse 컴포넌트입니다.
 * 판매 중인 특정 상품 목록을 유동적인 터치/마우스 드래그 및 스냅 기능으로 표시합니다.
 * 이 컴포넌트가 이제 "판매 중인 상품" 섹션의 전체 구조를 담당합니다.
 *
 * @returns 렌더링된 TripCourse 컴포넌트.
 */
function TripCourse({ pageType, urlAccountname }: ITripCourse) {
  // 현재 캐러셀에서 가장 왼쪽에 보이는(스냅된) 상품의 인덱스를 관리합니다.
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 드래그 상태를 추적하기 위한 Ref들
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslateRef = useRef(0);
  const prevTranslateRef = useRef(0);

  // pageType에 따라 accountname 결정
  const accountname =
    pageType === 'my-profile'
      ? getCookie('accountname') // 내 프로필일 때는 쿠키에서
      : urlAccountname; // 다른 사용자 프로필일 때는 URL에서

  // 개별 상품 아이템의 총 너비를 저장하는 State
  const [itemTotalWidth, setItemTotalWidth] = useState(0);
  // 첫 번째 상품 아이템에 대한 참조
  const firstProductItemRef = useRef<HTMLDivElement>(null);
  // 캐러셀 트랙 DOM 요소에 대한 참조
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // --- useQuery를 사용한 상품 데이터 불러오기 로직 ---
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['productsByAccount', accountname, pageType],
    queryFn: () => {
      if (!accountname) {
        throw new Error(
          '계정 정보를 찾을 수 없습니다. 로그인 상태를 확인해주세요.'
        );
      }
      return fetchProductsByAccount(accountname, 10);
    },
    enabled: !!accountname,
  });

  const products = productsData?.product || [];

  // API 응답 데이터 콘솔에 찍기
  useEffect(() => {
    if (productsData) {
      console.log('useQuery로 가져온 상품 데이터:', productsData.product);
    }
  }, [productsData]);

  // --- 아이템 너비 측정 로직  ---
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
  }, [products.length]);

  // --- currentTranslateRef 값을 실제 DOM 요소의 'transform' 속성에 적용하는 함수  ---
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

  // --- 'currentIndex'가 변경될 때 캐러셀을 해당 위치로 스냅시키는 useEffect  ---
  useEffect(() => {
    if (itemTotalWidth > 0 && carouselTrackRef.current) {
      const targetTranslate = -currentIndex * itemTotalWidth;
      currentTranslateRef.current = targetTranslate;
      setCarouselTransition('transform 0.3s ease-out');
      applyTranslate();
    }
  }, [currentIndex, itemTotalWidth, applyTranslate, setCarouselTransition]);

  // --- 드래그 시작/이동/종료 핸들러들 ---
  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    prevTranslateRef.current = currentTranslateRef.current;
    setCarouselTransition('none');
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const dragDistance = clientX - startX.current;
    let newTranslate = prevTranslateRef.current + dragDistance;

    const minTranslate = -(products.length - 1) * itemTotalWidth;
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

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setCarouselTransition('transform 0.3s ease-out');

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
          snapToIndex = Math.min(snapToIndex + 1, products.length - 1);
        } else {
          snapToIndex = Math.max(snapToIndex - 1, 0);
        }
        snapToIndex = Math.max(0, Math.min(snapToIndex, products.length - 1));
      }
      setCurrentIndex(snapToIndex);
    }
  };

  // --- 터치 및 마우스 이벤트 핸들러 ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };
  const handleTouchEnd = () => handleEnd();

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

  // --- 로딩 및 에러 UI (useQuery 상태 활용) ---
  if (isLoading) {
    return (
      <div className="pl-4 py-5">
        <h2 className="text-base font-bold mb-4 text-left">
          사용자 추천 여행지
        </h2>
        <div className="text-gray-600 p-4 border rounded-md text-center text-base">
          상품을 불러오는 중...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pl-4 py-5">
        <h2 className="text-base font-bold mb-4 text-left">
          사용자 추천 여행지
        </h2>
        <div className="text-red-600 p-4 border rounded-md text-center text-base">
          오류: {error?.message || '상품을 불러오는 데 실패했습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <h2 className="text-base font-bold mb-4 text-left px-4">
        사용자 추천 여행지
      </h2>

      {products.length === 0 ? (
        <div className="text-gray-600 p-4 border rounded-md text-center text-base mx-4">
          추천하는 여행지가 없습니다.
        </div>
      ) : (
        <div
          className="trip-course-container overflow-hidden relative w-full mx-auto px-4"
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
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={index === 0 ? firstProductItemRef : null}
                className="product-item flex-shrink-0 flex flex-col items-start rounded-lg bg-white w-[140px]"
              >
                <img
                  src={product.itemImage}
                  alt={product.itemName}
                  className="product-image w-full object-cover rounded mb-[6px] h-[90px]"
                />
                <div className="product-details text-left">
                  <h3 className="product-name text-sm mb-1">
                    {product.itemName}
                  </h3>
                  <p className="product-price text-xs text-main">
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
