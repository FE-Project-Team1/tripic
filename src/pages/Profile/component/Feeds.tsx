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
  accountname: string;
}

function Feeds({ accountname }: FeedsProps): ReactElement {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('feed');

  const handleFeedIconClick = (): void => {
    setCurrentScreen('feed');
  };

  const handleImageGridIconClick = (): void => {
    setCurrentScreen('grid');
  };

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
          <Feed accountname={accountname} />
        ) : (
          <ImageGrid accountname={accountname} />
        )}
      </div>
    </section>
  );
}

export default Feeds;
