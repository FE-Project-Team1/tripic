// src/context/ModalContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalItem {
  label: string;
  onClick?: () => void;
}

interface BtnPopupProps {
  title?: string;
  confirmText?: string;
  onConfirmClick?: () => void;
}

type ModalType = 'default' | 'custom';

interface ModalContextType {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean;
  modalType: ModalType;
  modalItems: ModalItem[];
  btnPopupProps: BtnPopupProps; // BtnPopup props 추가

  // 기본 모달 (설정 메뉴)
  openDefaultModal: () => void;

  // 커스텀 모달 (동적 메뉴)
  openCustomModal: (items: ModalItem[]) => void;

  // BtnPopup 관련 추가
  openBtnPopup: (props: BtnPopupProps) => void;

  // 공통
  closeModal: () => void;
  openConfirmModal: () => void; // 기존 로그아웃용
  closeConfirmModal: () => void;
  closeAllModals: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('default');
  const [modalItems, setModalItems] = useState<ModalItem[]>([]);
  const [btnPopupProps, setBtnPopupProps] = useState<BtnPopupProps>({}); // 추가

  // 기본 설정 메뉴
  const defaultModalItems: ModalItem[] = [
    {
      label: '설정 및 개인정보',
      onClick: () => {
        console.log('설정 및 개인정보 클릭');
        closeModal();
      },
    },
    {
      label: '로그아웃',
      onClick: () => {
        console.log('로그아웃 클릭');
        openConfirmModal(); // 기존 로그아웃 로직
      },
    },
  ];

  const openDefaultModal = () => {
    setModalType('default');
    setModalItems(defaultModalItems);
    setIsModalOpen(true);
  };

  const openCustomModal = (items: ModalItem[]) => {
    setModalType('custom');
    setModalItems(items);
    setIsModalOpen(true);
  };

  // 커스텀 BtnPopup 열기 함수 추가
  const openBtnPopup = (props: BtnPopupProps) => {
    setBtnPopupProps(props);
    setIsConfirmModalOpen(true);
    closeModal(); // BottomModal 먼저 닫기
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItems([]);
  };

  // 기존 로그아웃용 모달
  const openConfirmModal = () => {
    setBtnPopupProps({
      title: '로그아웃하시겠어요?',
      confirmText: '로그아웃',
      onConfirmClick: undefined, // BtnPopup에서 기본 로그아웃 로직 사용
    });
    setIsConfirmModalOpen(true);
    closeModal();
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setBtnPopupProps({}); // props 초기화
  };

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
    setModalItems([]);
    setBtnPopupProps({});
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isConfirmModalOpen,
        modalType,
        modalItems,
        btnPopupProps, // 추가
        openDefaultModal,
        openCustomModal,
        openBtnPopup, // 추가
        closeModal,
        openConfirmModal,
        closeConfirmModal,
        closeAllModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
