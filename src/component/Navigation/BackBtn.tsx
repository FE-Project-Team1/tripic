import { useNavigate } from 'react-router-dom';
import iconArrowLeft from '../../assets/icon-arrow-left.png';

function BackBtn() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 브라우저 히스토리에서 한 단계 뒤로 이동
  };

  return (
    <button
      type="button"
      className="h-[22px] w-[22px] cursor-pointer p-0 border-none bg-transparent flex items-center justify-center flex-shrink-0"
      aria-label="검색창 닫기"
      onClick={handleGoBack}
    >
      <img
        src={iconArrowLeft}
        alt="뒤로 가기"
        className="block h-full w-full"
      />
    </button>
  );
}

export default BackBtn;
