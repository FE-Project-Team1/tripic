import { useQuery } from '@tanstack/react-query';
import ProfileImage from '../../../component/ProfileImage';
import CommonBtn from '../../../component/CommonBtn';
import messageBtn from '../../../assets/message-btn.svg';
import shareBtn from '../../../assets/share-btn.svg';
import { getProfile } from '../../../api/profileApi';
import { getCookie } from '../../../utils/auth';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';

function ProfileInfo() {
  // 쿠키에서 accountname 가져오기
  const accountname = getCookie('accountname');

  // useQuery를 사용하여 프로필 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getProfile(accountname || ''),
    enabled: !!accountname, // accountname이 있을 때만 쿼리 실행
  });

  // 데이터가 로드되면 콘솔에 출력
  console.log('프로필 데이터:', data);

  // 로딩 중일 때
  if (isLoading)
    return (
      <div className="min-h-[322px]">
        <Loading />
      </div>
    );

  // 에러 발생 시
  if (isError) return <ErrorFallback />;

  // 프로필 데이터
  const profile = data?.profile;

  return (
    <section className="flex flex-col items-center max-w-[390px] h mx-auto overflow-auto">
      <h2 className="sr-only">프로필 정보</h2>
      <div className="w-full flex justify-between items-center mt-[30px] mb-[16px]">
        <div className="flex flex-col items-center ml-[41px]">
          <span className="text-lg font-bold">
            {profile?.followerCount || 0}
          </span>
          <span className="text-[10px] text-gray">followers</span>
        </div>
        {/* 프로필 이미지 영역 (빈 공간으로 유지) */}
        <div className="w-[110px] h-[110px] flex items-center justify-center">
          <ProfileImage />
        </div>
        <div className="flex flex-col items-center mr-[45px]">
          <span className="text-lg font-bold text-gray">
            {profile?.followingCount || 0}
          </span>
          <span className="text-[10px] text-gray">followings</span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center w-full">
        <p className="font-bold text-base mb-[6px]">
          {profile?.username || '사용자'}
        </p>
        <p className="text-xs text-gray">
          @ {profile?.accountname || 'accountname'}
        </p>
        <p className="text-sm text-gray mt-[16px] mb-[24px]">
          {profile?.intro || '소개글이 없습니다'}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full mb-[26px] gap-[10px]">
        <button>
          <img src={messageBtn} alt="메시지" />
        </button>
        <div className="w-30">
          {profile?.isfollow ? (
            <button className="w-[120px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center">
              언팔로우
            </button>
          ) : (
            <CommonBtn text="팔로우" size="medium" />
          )}
        </div>
        <button>
          <img src={shareBtn} alt="공유하기" />
        </button>
      </div>
    </section>
  );
}

export default ProfileInfo;

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
