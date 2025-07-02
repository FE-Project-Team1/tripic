import { useModal } from '../../context/ModalContext';
import iconMore from '../../assets/icon- more-vertical.svg';

function SettingBtn() {
  const { toggleModal } = useModal();

  return (
    <button
      className="w-6 h-6 flex justify-center items-center"
      onClick={toggleModal}
    >
      <img src={iconMore} alt={iconMore} className="w-full h-full block" />
    </button>
  );
}

export default SettingBtn;
