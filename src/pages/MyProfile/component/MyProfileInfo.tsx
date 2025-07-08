import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '../../../api/profile/myprofileApi';
import { getCookie } from '../../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import ProfileImage from '../../../component/ProfileImage';
import ErrorFallback from '../../../component/ErrorFallback';
import Loading from '../../../component/Loading';

function MyProfileInfo() {
  // 페이지 네비게이션을 위한 훅
  const navigate = useNavigate();

  // 쿠키에서 accountname 가져오기
  const accountname = getCookie('accountname');

  // useQuery를 사용하여 프로필 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getMyProfile(),
    enabled: !!accountname, // accountname이 있을 때만 쿼리 실행
  });

  // 데이터가 로드되면 콘솔에 출력
  console.log('프로필 데이터:', data);

  // 팔로워/팔로잉 클릭 핸들러
  const handleFollowingClick = () => {
    navigate('/my-profile/followings');
  };

  const handleFollowerClick = () => {
    navigate('/my-profile/followers');
  };

  // 로딩 중일 때

  if (isLoading)
    return (
      <div className="h=[386px]">
        <Loading />
      </div>
    );

  // 에러 발생 시

  if (isError)
    return (
      <div className="h=[378px]">
        <ErrorFallback />
      </div>
    );

  // 프로필 데이터 - 콘솔에서 확인한 응답 구조에 맞게 user 객체 사용
  const profile = data?.user;

  return (
    <section className="flex flex-col items-center max-w-[390px] h mx-auto overflow-auto">
      <h2 className="sr-only">프로필 정보</h2>
      <div className="w-full flex justify-between items-center mt-[30px] mb-[16px]">
        <div className="flex flex-col items-center ml-[41px] cursor-pointer">
          <span className="text-lg font-bold" onClick={handleFollowerClick}>
            {profile?.followerCount || 0}
          </span>
          <span className="text-[10px] text-gray">followers</span>
        </div>
        {/* 프로필 이미지 영역 (빈 공간으로 유지) */}
        <div className="w-[110px] h-[110px] flex items-center justify-center">
          <ProfileImage upload={false} />
        </div>
        <div className="flex flex-col items-center mr-[45px] cursor-pointer">
          <span
            className="text-lg font-bold text-gray"
            onClick={handleFollowingClick}
          >
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
          {(profile as any)?.intro || '소개글이 없습니다'}
        </p>
      </div>

      {/* 프로필수정, 상품등록 버튼 */}
      <div className="flex flex-row items-center justify-center w-full mb-[26px] gap-[12px]">
        <Link
          to="/my-profile/modification"
          className="w-[120px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center no-underline"
        >
          프로필 수정
        </Link>
        <Link
          to="/my-profile/product-upload"
          className="w-[100px] h-[34px] bg-[#FFFFFF] border border-light-gray rounded-[30px] text-gray text-[14px] font-medium flex items-center justify-center no-underline"
        >
          상품 등록
        </Link>
      </div>
    </section>
  );
}

export default MyProfileInfo;
