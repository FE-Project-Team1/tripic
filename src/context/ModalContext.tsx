import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean; // 새로 추가
  toggleModal: () => void;
  closeModal: () => void;
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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isConfirmModalOpen,
        toggleModal,
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
