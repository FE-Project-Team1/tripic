import { useState } from 'react';

interface IFollower {
  id: number;
  name: string;
  description: string;
  isFollowing: boolean;
  profileImageUrl: string;
}

function FollowList() {
  // 수정된 부분: FOLLOWERS_DATA를 useState로 관리하여 상태 변경 가능하게 함
  const [followers, setFollowers] = useState<IFollower[]>([
    {
      id: 1,
      name: '애월읍 한라봉 최고 맛집',
      description: '정성을 다해 농사짓는 한라봉',
      isFollowing: false,
      profileImageUrl: '/images/a.png',
    },
    {
      id: 2,
      name: '감귤의 품격 - 애월읍',
      description: '제주 노지귤, 하우스 한라봉 판매합니다.',
      isFollowing: false,
      profileImageUrl: '/images/b.png',
    },
    {
      id: 3,
      name: '한라봉의 신',
      description: '30년 노하우로 정성스럽게 농사지은 노지...',
      isFollowing: true,
      profileImageUrl: '/images/c.png',
    },
    {
      id: 4,
      name: '나 감귤 좋아하네',
      description: '감귤농장 컬렉터 i love mandarin',
      isFollowing: true,
      profileImageUrl: '/images/d.png',
    },
    {
      id: 5,
      name: '애월읍 한라봉 최고 맛집',
      description: '',
      isFollowing: false,
      profileImageUrl: '/images/e.png',
    },
    {
      id: 6,
      name: '제주 키위, 한라봉 판매',
      description: '키위, 한라봉',
      isFollowing: true,
      profileImageUrl: '/images/f.png',
    },
    {
      id: 7,
      name: '싱싱한 제주 한라봉',
      description: '제주 한라봉',
      isFollowing: false,
      profileImageUrl: '/images/g.png',
    },
  ]);

  // 수정된 부분: 팔로우/취소 버튼 클릭 핸들러 함수
  const handleFollowToggle = (id: number) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower.id === id
          ? { ...follower, isFollowing: !follower.isFollowing } // 해당 팔로워의 isFollowing 상태 토글
          : follower
      )
    );
  };

  return (
    <div className="min-h-screen bg-white pt-12">
      <ul className="flex flex-col space-y-4 py-6 list-none">
        {/* FOLLOWERS_DATA 대신 followers 상태 사용 */}
        {followers.map((follower: IFollower) => (
          <li
            key={follower.id}
            className="flex items-center justify-between p-4 h-[50px]"
          >
            <div className="flex items-center">
              <img
                src={follower.profileImageUrl}
                alt={follower.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div className="flex flex-col gap-y-[6px]">
                <p className="font-medium text-sm max-w-[288px] truncate">
                  {follower.name}
                </p>
                <p className="text-xs text-gray max-w-[240px] truncate">
                  {follower.description}
                </p>
              </div>
            </div>
            {/* 수정된 부분: isFollowing 상태에 따라 버튼 텍스트와 스타일 변경, onClick 이벤트 추가 */}
            {follower.isFollowing ? (
              <button
                onClick={() => handleFollowToggle(follower.id)} // 클릭 시 상태 토글 함수 호출
                className="
                  w-14 h-7 flex items-center justify-center
                  text-xs text-gray bg-white
                  rounded-[26px] whitespace-nowrap border-light-gray border-[1px]
                "
              >
                취소
              </button>
            ) : (
              <button
                onClick={() => handleFollowToggle(follower.id)} // 클릭 시 상태 토글 함수 호출
                className="
                  w-14 h-7 flex items-center justify-center
                  text-xs text-white bg-main
                  rounded-[26px] whitespace-nowrap
                "
              >
                팔로우
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowList;
