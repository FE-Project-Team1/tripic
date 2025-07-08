import { useModal } from '../context/ModalContext';

function BottomModal() {
  const { isModalOpen, closeModal, modalItems } = useModal();

  // 핸들 클릭 시 모달 닫기
  const handleClose = () => {
    closeModal();
  };

  const handleItemClick = (itemOnClick?: () => void) => {
    if (itemOnClick) {
      itemOnClick();
    }
    closeModal(); // 메뉴 아이템 클릭 시 바텀모달 닫기
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      className={`fixed left-0 right-0 bottom-0 z-[60] bg-white rounded-t-[10px] pt-4 pb-[10px] shadow-lg border border-gray-200 transition-transform duration-300 ease-out ${
        isModalOpen ? 'translate-y-0' : 'translate-y-[180px]'
      }`}
    >
      <div className="flex justify-center mb-4">
        <div
          className="w-[50px] h-1 rounded-full bg-gray-200"
          onClick={handleClose}
        />
      </div>
      <ul>
        {modalItems.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <button
              className="w-full h-[46px] text-sm text-black text-left flex items-center py-[14px] pl-[26px]"
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BottomModal;
