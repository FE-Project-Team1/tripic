import messageBtn from '../../../assets/message-btn.svg';
import shareBtn from '../../../assets/share-btn.svg';

function Profile() {
  return (
    <div className="flex flex-col items-center w-[390px] h-[362px] mx-auto overflow-auto">
      <div className="w-full flex justify-between items-center mt-[78px] mb-[16px]">
        <div className="flex flex-col items-center ml-[41px]">
          <span className="text-lg font-bold">2950</span>
          <span className="text-[10px] text-gray">followers</span>
        </div>
        {/* 프로필 이미지 영역 (빈 공간으로 유지) */}
        <div className="w-[110px] h-[110px] flex items-center justify-center"></div>
        <div className="flex flex-col items-center mr-[45px]">
          <span className="text-lg font-bold text-gray">128</span>
          <span className="text-[10px] text-gray">followings</span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center w-full">
        <p className="font-bold text-base mb-[6px]">애월읍 위니브 감귤농장</p>
        <p className="text-xs text-gray">@ weniv_Mandarin</p>
        <p className="text-sm text-gray mt-[16px] mb-[24px]">
          애월을 감귤 전국 배송, 곶감키 제철, 감귤 농장
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full mb-[26px] gap-[10px]">
        <button>
          <img src={messageBtn} alt="메시지" />
        </button>
        <button className="w-[120px] h-[34px] bg-[#F26E22] rounded-[30px] text-white text-[14px] font-medium flex items-center justify-center">
          팔로우
        </button>
        <button>
          <img src={shareBtn} alt="공유하기" />
        </button>
      </div>
    </div>
  );
}

export default Profile;

{
  /* 언팔로우 버튼 */
}

{
  /*
    function unfollow() {
      return (
        <button className="w-[120px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center">언팔로우</button>
      );
    }
    
  export default unfollow;
  */
}

{
  /* 프로필수정, 상품등록 버튼 */
}

{
  /*
function editRegistration() {
  return (
    <div className="flex flex-row items-center justify-center w-full mb-[26px] gap-[12px]">
      <button className="w-[120px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center">프로필 수정</button>
      <button className="w-[100px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center">상품 등록</button>
    </div>
  );
}

export default editRegistration;
*/
}
