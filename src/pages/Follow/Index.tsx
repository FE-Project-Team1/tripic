

interface IFollower {
  id: number;
  name: string;
  description: string;
  isFollowing: boolean;
  profileImageUrl: string; 
}


function Follow() {
  const FOLLOWERS_DATA: IFollower[] = [
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
  ];

  return (
    <div className='min-h-screen bg-white'>
      <ul className='flex flex-col space-y-4 py-2 pt-6 list-none'> {/* list-none 추가 */}
        {FOLLOWERS_DATA.map((follower: IFollower) => (
          <li
            key={follower.id}
            className='flex items-center justify-between p-4 h-[50px]'
          >
            <div className='flex items-center'>
              <img
                src={follower.profileImageUrl} // 이제 직접 경로 문자열을 사용합니다.
                alt={follower.name}
                className='w-12 h-12 rounded-full mr-4 object-cover'
              />
              <div className='flex flex-col gap-y-[6px]'>
                <p className='font-medium text-gray-900 text-sm max-w-[288px] truncate'>
                  {follower.name}
                </p>
                <p
                  className='text-xs text-gray-500 max-w-[240px] truncate'
                >
                  {follower.description}
                </p>
              </div>
            </div>
            {follower.isFollowing ? (
              <button
                className='
                  w-14 h-7 flex items-center justify-center
                  text-sm text-gray-600 bg-gray-100
                  rounded-[26px] whitespace-nowrap
                '
              >
                취소
              </button>
            ) : (
              <button
                className='
                  w-14 h-7 flex items-center justify-center
                  text-sm text-white bg-orange-500
                  rounded-[26px] whitespace-nowrap
                '
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

export default Follow;