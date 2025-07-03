import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProfile } from '../../../api/profileApi';
import ProfileImage from '../../../component/ProfileImage';
import CommonBtn from '../../../component/CommonBtn';
import messageBtn from '../../../assets/message-btn.svg';
import shareBtn from '../../../assets/share-btn.svg';
import { useParams } from 'react-router-dom';

function YourProfileInfo() {
  // URL에서 accountname 가져오기
  const { accountname } = useParams<{ accountname: string }>();

  // 버튼 상태를 위한 state
  const [isFollowed, setIsFollowed] = useState(false);

  // useQuery를 사용하여 프로필 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getProfile(accountname || ''),
    enabled: !!accountname, // accountname이 있을 때만 쿼리 실행
  });

  // 데이터가 로드되면 콘솔에 출력
  console.log('프로필 데이터:', data);

  // 로딩 중일 때
  if (isLoading) return <div>로딩 중...</div>;

  // 에러 발생 시
  if (isError) return <div>프로필 정보를 불러오는 중 오류가 발생했습니다.</div>;

  // 프로필 데이터
  const profile = data?.profile;

  // 팔로우 버튼 클릭 핸들러
  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
  };

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
          {isFollowed ? (
            <button
              className="w-[120px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center"
              onClick={handleFollowClick}
            >
              언팔로우
            </button>
          ) : (
            <CommonBtn
              text="팔로우"
              size="medium"
              onClick={handleFollowClick}
            />
          )}
        </div>
        <button>
          <img src={shareBtn} alt="공유하기" />
        </button>
      </div>
    </section>
  );
}

export default YourProfileInfo;
