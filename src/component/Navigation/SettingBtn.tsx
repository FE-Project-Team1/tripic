// src/component/Navigation/SettingBtn.tsx
import { useModal } from '../../context/ModalContext';
import iconMore from '../../assets/icon-more-vertical.svg';

interface ISettingBtn {
  type?: 'default' | 'custom';
  customItems?: Array<{ label: string; onClick?: () => void }>;
  onClick?: () => void;
}

function SettingBtn({ type = 'default', customItems, onClick }: ISettingBtn) {
  const { openDefaultModal, openCustomModal } = useModal();

  const handleClick = () => {
    if (onClick) {
      // 커스텀 onClick이 있으면 우선 실행
      onClick();
    } else if (type === 'custom' && customItems) {
      // 커스텀 메뉴
      openCustomModal(customItems);
    } else {
      // 기본 설정 메뉴
      openDefaultModal();
    }
  };

  return (
    <button
      className="w-6 h-6 flex justify-center items-center"
      onClick={handleClick}
    >
      <img src={iconMore} alt="더보기" className="w-full h-full block" />
    </button>
  );
}

export default SettingBtn;
