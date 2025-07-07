import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import Feed from '../../../component/Feed';
import ImageGrid from '../../YourProfile/component/ImageGrid';
import iconPostAlbumOff from '../../../assets/icon-post-album-off.png';
import iconPostAlbumOn from '../../../assets/icon-post-album-on.png';
import iconPostListOff from '../../../assets/icon-post-list-off.png';
import iconPostListOn from '../../../assets/icon-post-list-on.png';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import { fetchUserPostsByAccount } from '../../../api/postApi';
import type { IGetUserPostsResponse } from '../../../api/postApi';

type ScreenMode = 'feed' | 'grid';

interface FeedsProps {
  accountname: string | null | undefined;
}

function Feeds({ accountname }: FeedsProps): ReactElement {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('feed');

  const {
    data: postsData, // API 응답 데이터 (IGetUserPostsResponse)
    isLoading, // 로딩 상태
    isError, // 에러 상태
  } = useQuery<IGetUserPostsResponse, Error>({
    queryKey: ['userPosts', accountname], // 쿼리 키 (accountname에 따라 캐시가 달라집니다)
    queryFn: () => {
      if (!accountname) {
        // accountname이 없을 경우, 쿼리를 실행하지 않거나 에러를 발생시킬 수 있습니다.
        // 여기서는 Promise.reject를 사용하여 useQuery가 에러 상태로 진입하게 합니다.
        return Promise.reject(new Error('계정 정보가 유효하지 않습니다.'));
      }
      return fetchUserPostsByAccount(accountname);
    },
    // accountname이 null 또는 undefined일 때는 쿼리를 비활성화합니다.
    enabled: !!accountname,
  });

  // ✨ [수정] posts 상태 대신 useQuery의 data를 사용
  const posts = postsData?.post || []; // 데이터가 없을 경우 빈 배열로 초기화

  const handleFeedIconClick = (): void => {
    setCurrentScreen('feed');
  };

  const handleImageGridIconClick = (): void => {
    setCurrentScreen('grid');
  };

  // accountname이 유효한지 먼저 체크합니다. (useQuery의 enabled 옵션으로도 처리 가능)
  if (!accountname) {
    return (
      <section className="text-center py-8 text-gray-500">
        <p>계정 정보를 불러올 수 없습니다. 다시 시도해주세요.</p>
      </section>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  // accountname이 유효한 string이고 로딩, 에러가 아닐 때만 아래 로직을 실행합니다.
  return (
    <section>
      <div className="bg-white px-4 flex h-11 justify-end border-light-gray border-b-[1px]">
        <button
          onClick={handleFeedIconClick}
          className="p-1 rounded-md focus:outline-none"
          aria-label="피드 화면 보기"
        >
          <img
            src={currentScreen === 'feed' ? iconPostListOn : iconPostListOff}
            alt="피드 아이콘"
            className="h-6 w-6"
          />
        </button>
        <button
          onClick={handleImageGridIconClick}
          className="p-1 rounded-md focus:outline-none"
          aria-label="이미지 그리드 화면"
        >
          <img
            src={currentScreen === 'grid' ? iconPostAlbumOn : iconPostAlbumOff}
            alt="앨범 아이콘"
            className="h-6 w-6"
          />
        </button>
      </div>
      <div className="w-full max-w-[608px] bg-white px-4 py-4 mx-auto">
        {currentScreen === 'feed' ? (
          <ul>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id}>
                  <Feed post={post} />
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">
                아직 게시물이 없습니다.
              </p>
            )}
          </ul>
        ) : (
          <ImageGrid accountname={accountname} />
        )}
      </div>
    </section>
  );
}

export default Feeds;
