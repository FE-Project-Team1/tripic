import { useModal } from '../context/ModalContext';

interface ModalItem {
  label: string;
  onClick?: () => void;
}

interface IBottomModal {
  items: ModalItem[];
}

function BottomModal({ items }: IBottomModal) {
  const { isModalOpen, closeModal } = useModal();

  // 핸들 클릭 시 모달 닫기
  const handleClose = () => {
    closeModal();
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      className={`fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-[10px] pt-4 pb-[10px] shadow-lg border border-gray-200 transition-transform duration-300 ease-out ${
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
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <button
              className="w-full h-[46px] text-sm text-black text-left flex items-center py-[14px] pl-[26px]"
              onClick={item.onClick}
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
