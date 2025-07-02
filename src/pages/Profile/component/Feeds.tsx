import { useState } from 'react';
import type { ReactElement } from 'react';
import Feed from '../../../component/Feed';
import ImageGrid from './ImageGrid';
import iconPostAlbumOff from '../../../assets/icon-post-album-off.png';
import iconPostAlbumOn from '../../../assets/icon-post-album-on.png';
import iconPostListOff from '../../../assets/icon-post-list-off.png';
import iconPostListOn from '../../../assets/icon-post-list-on.png';

// accountname을 상위 컴포넌트에서 prop으로 받는다고 가정합니다.
type ScreenMode = 'feed' | 'grid';

interface FeedsProps {
  // ✨ accountname이 null 또는 undefined일 가능성을 명시합니다.
  accountname: string | null | undefined;
}

function Feeds({ accountname }: FeedsProps): ReactElement {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('feed');

  const handleFeedIconClick = (): void => {
    setCurrentScreen('feed');
  };

  const handleImageGridIconClick = (): void => {
    setCurrentScreen('grid');
  };

  // accountname이 유효한지 먼저 체크합니다.
  if (!accountname) {
    // accountname이 없거나 유효하지 않을 때 보여줄 UI를 결정합니다.
    // 예를 들어, 로딩 메시지, 오류 메시지, 로그인 유도 메시지 등을 표시할 수 있습니다.
    return (
      <section className="text-center py-8 text-gray-500">
        <p>계정 정보를 불러올 수 없습니다. 다시 시도해주세요.</p>
      </section>
    );
  }

  // accountname이 유효한 string일 때만 아래 로직을 실행합니다.
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
          // ✨ 이제 accountname은 확실히 string 타입이므로 오류 없이 전달 가능
          <Feed accountname={accountname} />
        ) : (
          // ✨ 마찬가지로 accountname은 확실히 string 타입이므로 오류 없이 전달 가능
          <ImageGrid accountname={accountname} />
        )}
      </div>
    </section>
  );
}

export default Feeds;