import { useModal } from '../../context/ModalContext';
import settingBtn from '../../assets/s-icon-more-vertical.svg';

const MyPostModalItems = [
  {
    label: '삭제',
    onClick: () => {},
  },
  {
    label: '수정',
    onClick: () => {},
  },
];

function SettingBtn() {
  const { openModal } = useModal();

  const handleClick = () => {
    console.log('working');
    openModal(MyPostModalItems);
  };

  return (
    <button onClick={handleClick}>
      <img src={settingBtn} alt="더보기 버튼" />
    </button>
  );
}

export default SettingBtn;
