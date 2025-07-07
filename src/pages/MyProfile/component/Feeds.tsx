import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import Feed from '../../../component/Feed';
import ImageGrid from '../../MyProfile/component/ImageGrid';
import iconPostAlbumOff from '../../../assets/icon-post-album-off.png';
import iconPostAlbumOn from '../../../assets/icon-post-album-on.png';
import iconPostListOff from '../../../assets/icon-post-list-off.png';
import iconPostListOn from '../../../assets/icon-post-list-on.png';

// ✨ Loading 컴포넌트와 ErrorFallback 컴포넌트 임포트
import Loading from '../../../component/Loading'; // 경로 확인 필요
import ErrorFallback from '../../../component/ErrorFallback'; // 경로 확인 필요

// API 함수와 타입을 type-only import로 가져오기
import { fetchUserPostsByAccount } from '../../../api/postApi';
import type { IUserPost, IGetUserPostsResponse } from '../../../api/postApi'; // 실제 API 파일 경로에 맞게 수정해주세요.

type ScreenMode = 'feed' | 'grid';

interface FeedsProps {
  accountname: string | null | undefined;
}

function Feeds({ accountname }: FeedsProps): ReactElement {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('feed');
  const [posts, setPosts] = useState<IUserPost[]>([]); // 게시물 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const loadPosts = async () => {
      if (!accountname) {
        setLoading(false);
        setPosts([]);
        // accountname이 없을 때 에러 메시지를 표시하고 싶다면 setError('계정 정보 없음'); 추가
        return;
      }

      setLoading(true);
      setError(null); // 새로운 로딩 시작 시 에러 초기화

      try {
        const data: IGetUserPostsResponse = await fetchUserPostsByAccount(accountname);
        setPosts(data.post);
      } catch (err: any) {
        setError(err.message || '게시물을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [accountname]); // accountname이 변경될 때마다 재실행

  const handleFeedIconClick = (): void => {
    setCurrentScreen('feed');
  };

  const handleImageGridIconClick = (): void => {
    setCurrentScreen('grid');
  };

  // accountname이 유효한지 먼저 체크합니다.
  if (!accountname) {
    return (
      <section className="text-center py-8 text-gray-500">
        <p>계정 정보를 불러올 수 없습니다. 다시 시도해주세요.</p>
      </section>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
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
          aria-label="이미지 그리드 화면 보기"
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
              <p className="text-center text-gray-500">아직 게시물이 없습니다.</p>
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