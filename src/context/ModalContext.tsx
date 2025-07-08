// src/context/ModalContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalItem {
  label: string;
  onClick?: () => void;
}

type ModalType = 'default' | 'custom';

interface ModalContextType {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean;
  modalType: ModalType;
  modalItems: ModalItem[];

  // 기본 모달 (설정 메뉴)
  openDefaultModal: () => void;

  // 커스텀 모달 (동적 메뉴)
  openCustomModal: (items: ModalItem[]) => void;

  // 공통
  closeModal: () => void;
  openConfirmModal: () => void;
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

  // 기본 설정 메뉴
  const defaultModalItems: ModalItem[] = [
    {
      label: '설정 및 개인정보',
      onClick: () => {
        console.log('설정 및 개인정보 클릭');
      },
    },
    {
      label: '로그아웃',
      onClick: () => {
        console.log('로그아웃 클릭');
        openConfirmModal();
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

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItems([]);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    closeModal(); // 바텀모달 먼저 닫기
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
    setModalItems([]);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isConfirmModalOpen,
        modalType,
        modalItems,
        openDefaultModal,
        openCustomModal,
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
