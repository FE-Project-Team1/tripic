import { useModal } from '../context/ModalContext';
import { deleteAllCookies } from '../utils/auth';

function BtnPopup() {
  const { isConfirmModalOpen, closeAllModals } = useModal();

  const handleCancel = () => {
    closeAllModals(); // BtnPopup과 BottomModal 모두 닫기
  };

  const handleLogout = () => {
    const result = confirm('정말 로그아웃 하시겠습니까?');
    if (result) {
      console.log('로그아웃 처리');
      // 실제 로그아웃 로직 구현
      deleteAllCookies();
      closeAllModals();
    }
  };

  // 기본 상태는 안보임
  if (!isConfirmModalOpen) return null;

  return (
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[252px] h-[110px] bg-white rounded-[10px] flex flex-col justify-between shadow">
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-base font-medium text-center">
          로그아웃하시겠어요?
        </h2>
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
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default BtnPopup;
