import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalItem {
  label: string;
  onClick?: () => void;
}

interface ModalContextType {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean; // 새로 추가
  modalItems: ModalItem[]; // 새로 추가
  toggleModal: () => void;
  closeModal: () => void;
  openModal: (items?: ModalItem[]) => void; // 새로 추가
  openConfirmModal: () => void; // 새로 추가
  closeConfirmModal: () => void; // 새로 추가
  closeAllModals: () => void; // 새로 추가
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
  const [modalItems, setModalItems] = useState<ModalItem[]>([]); // 새로 추가

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItems([]); // 모달 닫을 때 아이템들도 초기화
  };

  const openModal = (items: ModalItem[] = []) => {
    setModalItems(items);
    setIsModalOpen((prev) => !prev);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
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
        modalItems,
        toggleModal,
        closeModal,
        openModal,
        openConfirmModal,
        closeConfirmModal,
        closeAllModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
