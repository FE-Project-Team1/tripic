// src/components/Feeds.tsx
import { useState } from 'react';
import type { ReactElement } from 'react';

import Feed from '../../../component/Feed';
import ImageGrid from './ImageGrid';

import iconPostAlbumOff from '../../../assets/icon-post-album-off.png';
import iconPostAlbumOn from '../../../assets/icon-post-album-on.png';
import iconPostListOff from '../../../assets/icon-post-list-off.png';
import iconPostListOn from '../../../assets/icon-post-list-on.png';

type ScreenMode = 'feed' | 'grid';

function Feeds(): ReactElement {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('feed');

  const handleFeedIconClick = (): void => {
    console.log('피드 아이콘 클릭됨: Feed 화면 표시');
    setCurrentScreen('feed');
  };

  const handleImageGridIconClick = (): void => {
    console.log('그리드 아이콘 클릭됨: ImageGrid 화면으로 이동');
    setCurrentScreen('grid');
  };

  return (
    <section>
      <div className="bg-white px-4 flex h-11 justify-end border-light-gray border-b-[1px]">
        <button
          onClick={handleFeedIconClick}
          className={`p-1 rounded-md focus:outline-none`}
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
          className={`p-1 rounded-md focus:outline-none`}
          aria-label="이미지 그리드 화면 보기"
        >
          <img
            src={currentScreen === 'grid' ? iconPostAlbumOn : iconPostAlbumOff}
            alt="앨범 아이콘"
            className="h-6 w-6"
          />
        </button>
      </div>
      <div className="w-full max-w-md bg-white px-4 pb-4 mx-auto">
        {currentScreen === 'feed' ? <Feed /> : <ImageGrid />}
      </div>
    </section>
  );
}

export default Feeds;
