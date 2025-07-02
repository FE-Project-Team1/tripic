import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import iconMore from '../../assets/icon- more-vertical.svg';

function SettingBtn() {
  // Context가 없어도 에러가 발생하지 않도록 처리
  const modalContext = useContext(ModalContext);

  const handleClick = () => {
    if (modalContext) {
      modalContext.toggleModal();
    } else {
      console.log('모달 없이 설정 버튼 클릭');
      // 다른 동작 수행
    }
  };

  return (
    <button
      className="w-6 h-6 flex justify-center items-center"
      onClick={handleClick}
    >
      <img src={iconMore} alt={iconMore} className="w-full h-full block" />
    </button>
  );
}

export default SettingBtn;
