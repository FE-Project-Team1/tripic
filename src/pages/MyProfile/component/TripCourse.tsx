import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../utils/auth';
import { fetchProductsByAccount } from '../../../api/productApi';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import { useModal } from '../../../context/ModalContext';
import { deleteProduct } from '../../../api/product/deleteProduct';
import type { IProduct, IBtnPopup } from '../../../types/commonType';

interface ITripCourse {
  pageType: string;
  urlAccountname?: string;
  setPopupProps: React.Dispatch<React.SetStateAction<IBtnPopup>>;
}

// 스와이프를 인식할 최소 이동 거리 (픽셀)
const SWIPE_THRESHOLD = 30;

/**
 * TripCourse 컴포넌트입니다.
 * 판매 중인 특정 상품 목록을 유동적인 터치/마우스 드래그 및 스냅 기능으로 표시합니다.
 * 이 컴포넌트가 이제 "판매 중인 상품" 섹션의 전체 구조를 담당합니다.
 *
 * @returns 렌더링된 TripCourse 컴포넌트.
 */
function TripCourse({ pageType, urlAccountname, setPopupProps }: ITripCourse) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openModal, openConfirmModal, closeAllModals } = useModal();

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
  }, [products.length]);

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

  // --- 드래그 시작/이동/종료 핸들러들 (이벤트 객체 타입은 Generic으로 설정) ---
  const handleStart = useCallback(
    (clientX: number) => {
      isDragging.current = true;
      startX.current = clientX;
      prevTranslateRef.current = currentTranslateRef.current;
      setCarouselTransition('none');
    },
    [setCarouselTransition]
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging.current) return;

      const dragDistance = clientX - startX.current;
      let newTranslate = prevTranslateRef.current + dragDistance;

      const minTranslate = -(products.length - 1) * itemTotalWidth;
      const maxTranslate = 0;
      const elasticity = 0.2;

      if (newTranslate > maxTranslate) {
        newTranslate =
          maxTranslate + (newTranslate - maxTranslate) * elasticity;
      } else if (newTranslate < minTranslate) {
        newTranslate =
          minTranslate + (newTranslate - minTranslate) * elasticity;
      }

      currentTranslateRef.current = newTranslate;
      applyTranslate();
    },
    [products.length, itemTotalWidth, applyTranslate]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setCarouselTransition('transform 0.3s ease-out');

    const movedBy = currentTranslateRef.current - prevTranslateRef.current;

    if (Math.abs(movedBy) < SWIPE_THRESHOLD) {
      // 스냅될 위치로 돌아가거나 현재 위치 유지
      setCurrentIndex(currentIndex);
    } else {
      let snapToIndex;

      if (itemTotalWidth === 0) {
        snapToIndex = 0;
      } else {
        // 현재 위치에서 가장 가까운 상품 인덱스 계산
        snapToIndex = Math.round(
          Math.abs(currentTranslateRef.current) / itemTotalWidth
        );

        // 이동 방향에 따라 다음/이전 인덱스로 조정
        if (movedBy < 0) {
          // 왼쪽으로 스와이프 (다음 상품으로 이동)
          snapToIndex = Math.min(snapToIndex + 1, products.length - 1);
        } else {
          // 오른쪽으로 스와이프 (이전 상품으로 이동)
          snapToIndex = Math.max(snapToIndex - 1, 0);
        }
        // 인덱스가 배열 범위를 벗어나지 않도록 보정
        snapToIndex = Math.max(0, Math.min(snapToIndex, products.length - 1));
      }
      setCurrentIndex(snapToIndex);
    }
  }, [currentIndex, itemTotalWidth, products.length, setCarouselTransition]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      handleEnd();
    }
  }, [handleEnd]);

  // --- currentIndex가 변경될 때 캐러셀을 해당 위치로 스냅시키는 useEffect ---
  useEffect(() => {
    if (itemTotalWidth > 0 && carouselTrackRef.current) {
      const targetTranslate = -currentIndex * itemTotalWidth;
      currentTranslateRef.current = targetTranslate;
      setCarouselTransition('transform 0.3s ease-out');
      applyTranslate();
    }
  }, [currentIndex, itemTotalWidth, applyTranslate, setCarouselTransition]);

  // --- 이벤트 리스너를 직접 등록하여 passive 옵션 제어 ---
  useEffect(() => {
    const carouselElement = carouselTrackRef.current;
    if (!carouselElement) return;

    // 터치 이벤트 핸들러
    const touchStartHandler = (e: TouchEvent) => {
      // e.preventDefault(); // 필요하다면 여기서도 preventDefault()
      handleStart(e.touches[0].clientX);
    };
    const touchMoveHandler = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault(); // passive: false 덕분에 여기서 문제 없음
      handleMove(e.touches[0].clientX);
    };
    const touchEndHandler = () => handleEnd();

    // 마우스 이벤트 핸들러
    const mouseDownHandler = (e: MouseEvent) => {
      // e.preventDefault(); // 필요하다면 여기서도 preventDefault()
      handleStart(e.clientX);
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      handleMove(e.clientX);
    };
    const mouseUpHandler = () => handleEnd();

    // passive: false로 터치 이벤트를 등록
    carouselElement.addEventListener('touchstart', touchStartHandler, {
      passive: false,
    });
    carouselElement.addEventListener('touchmove', touchMoveHandler, {
      passive: false,
    });
    carouselElement.addEventListener('touchend', touchEndHandler, {
      passive: false,
    });
    carouselElement.addEventListener('touchcancel', touchEndHandler, {
      passive: false,
    }); // 터치 취소도 처리

    // 마우스 이벤트도 직접 등록
    carouselElement.addEventListener('mousedown', mouseDownHandler);
    carouselElement.addEventListener('mousemove', mouseMoveHandler);
    carouselElement.addEventListener('mouseup', mouseUpHandler);
    carouselElement.addEventListener('mouseleave', handleMouseLeave); // 마우스 리브 이벤트는 기존 핸들러 사용

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      carouselElement.removeEventListener('touchstart', touchStartHandler);
      carouselElement.removeEventListener('touchmove', touchMoveHandler);
      carouselElement.removeEventListener('touchend', touchEndHandler);
      carouselElement.removeEventListener('touchcancel', touchEndHandler);

      carouselElement.removeEventListener('mousedown', mouseDownHandler);
      carouselElement.removeEventListener('mousemove', mouseMoveHandler);
      carouselElement.removeEventListener('mouseup', mouseUpHandler);
      carouselElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleStart, handleMove, handleEnd, handleMouseLeave, isDragging]); // 종속성 배열에 carouselTrackRef를 넣지 않음: 렌더링 시점에 current가 null이 아닐 때만 실행되도록 보장 (이미 carouselTrackRef.current가 !null 조건으로 체크됨)

  // 상품 삭제 함수
  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      try {
        console.log('상품 삭제 시작:', productId);
        await deleteProduct(productId);

        // 성공 시 처리
        queryClient.invalidateQueries({
          queryKey: ['productsByAccount', accountname, pageType],
        });
        closeAllModals();
        setPopupProps({}); // BtnPopup props 초기화
        alert('상품이 삭제되었습니다');
      } catch (error) {
        // 실패 시 처리
        console.error('상품 삭제 실패:', error);
        const errorMessage =
          error instanceof Error ? error.message : '상품 삭제에 실패했습니다.';
        alert(errorMessage);
        closeAllModals();
        setPopupProps({}); // 실패해도 팝업 초기화
      }
    },
    [queryClient, accountname, pageType, closeAllModals, setPopupProps]
  );
  // 제품 클릭 핸들러
  const handleProductClick = useCallback(
    (product: IProduct) => {
      if (pageType === 'my-profile') {
        // 내 프로필일 때만 수정/삭제 가능
        const productModalItems = [
          {
            label: '수정',
            onClick: () => {
              // TODO: 상품 수정 페이지로 이동하거나 수정 로직 구현
              navigate(`/my-profle/product-modification/${product.id}`);
            },
          },
          {
            label: '삭제',
            onClick: () => {
              setPopupProps({
                title: '상품을 삭제할까요?',
                confirmText: '삭제',
                onConfirmClick: () => handleDeleteProduct(product.id),
              });
              openConfirmModal();
            },
          },
        ];

        openModal(productModalItems);
      } else {
        // 다른 사용자 프로필일 때는 상세보기나 다른 액션
        console.log('상품 상세보기:', product.id);
        // TODO: 상품 상세 페이지로 이동하거나 상세 정보 표시
      }
    },
    [
      pageType,
      openModal,
      navigate,
      handleDeleteProduct,
      openConfirmModal,
      setPopupProps,
    ]
  );

  // --- 로딩 및 에러 UI  ---
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFallback />;
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
        <div className="trip-course-container overflow-hidden relative w-full mx-auto px-4">
          <div
            ref={carouselTrackRef}
            className="product-carousel flex gap-[10px]"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={index === 0 ? firstProductItemRef : null}
                className="product-item flex-shrink-0 flex flex-col items-start rounded-lg bg-white w-[140px]"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.itemImage}
                  alt={product.itemName}
                  className="product-image w-full object-cover rounded mb-[6px] h-[90px]"
                  crossOrigin="anonymous" // 업로드된 이미지 표시 오류 (CORS 오류) 해결을 위해 추가
                />
                <div className="product-details text-left">
                  <h3 className="product-name text-sm mb-1">
                    {product.itemName}
                  </h3>
                  {/* 위치 정보(국가명) 표시 */}
                  {product.link && (
                    <div className="text-gray text-xs mb-1">{product.link}</div>
                  )}
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
