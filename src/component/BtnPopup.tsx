// src/component/BtnPopup.tsx
import { useModal } from '../context/ModalContext';
import { deleteAllCookies } from '../utils/auth';

function BtnPopup() {
  const { isConfirmModalOpen, btnPopupProps, closeAllModals } = useModal();

  const handleCancel = () => {
    closeAllModals();
  };

  const handleConfirm = () => {
    if (btnPopupProps.onConfirmClick) {
      // 커스텀 확인 로직 실행
      btnPopupProps.onConfirmClick();
    } else {
      // 기본 로그아웃 로직
      const result = confirm('정말 로그아웃 하시겠습니까?');
      if (result) {
        console.log('로그아웃 처리');
        deleteAllCookies();
      }
    }
    closeAllModals();
  };

  // 모달이 열려있지 않으면 렌더링 안함
  if (!isConfirmModalOpen) return null;

  const { title = '로그아웃하시겠어요?', confirmText = '로그아웃' } =
    btnPopupProps;

  return (
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[252px] h-[110px] bg-white rounded-[10px] flex flex-col justify-between shadow">
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-base font-medium text-center">{title}</h2>
      </div>

      <div
        className="flex h-[46px]"
        style={{ borderTop: '0.5px solid #dbdbdb' }}
      >
        <button
          type="button"
          className="w-1/2 h-full text-sm text-black bg-white rounded-bl-[10px] leading-none p-0"
          style={{ borderRight: '0.5px solid #dbdbdb' }}
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          type="button"
          className="w-1/2 h-full text-sm text-[color:var(--color-main)] bg-white rounded-br-[10px] font-medium leading-none p-0"
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default BtnPopup;
