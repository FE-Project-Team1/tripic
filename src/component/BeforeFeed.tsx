import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import heart from '../assets/heart.svg';
import heartFill from '../assets/heart-fill.svg';
import messageCircleBtn from '../assets/message-circle.svg';
import profileImage from '../assets/profile-img.svg';
import moreBtn from '../assets/s-icon-more-vertical.svg';
import { fetchUserPostsByAccount } from '../api/postApi';
import Loading from './Loading';
import ErrorFallback from './ErrorFallback';

interface FeedProps {
  accountname?: string;
}

function getProfileImage(img: string | undefined) {
  if (!img || img === 'null' || img === '' || img.startsWith('/'))
    return profileImage;
  if (img.startsWith('http')) return img;
  return profileImage;
}

function Feed({ accountname }: FeedProps) {
  // 게시글별 좋아요 상태 및 카운트 관리
  // likedPosts 상태를 localStorage에서 초기화합니다.
  // 컴포넌트가 처음 마운트될 때만 이 함수가 실행되어 저장된 값을 불러옵니다.
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    () => {
      // window 객체가 정의되어 있는지 확인하여 SSR 환경에서 에러 방지
      if (typeof window !== 'undefined' && accountname) {
        const saved = localStorage.getItem(`likedPosts_${accountname}`); // 계정별로 구분하여 저장
        return saved ? JSON.parse(saved) : {};
      }
      return {};
    }
  );
  const [likeCounts, setLikeCounts] = useState<{ [postId: string]: number }>(
    {}
  );

  // likedPosts 상태가 변경될 때마다 localStorage에 저장합니다.
  // 이 useEffect는 likedPosts 또는 accountname이 변경될 때마다 실행됩니다.
  useEffect(() => {
    if (typeof window !== 'undefined' && accountname) {
      localStorage.setItem(
        `likedPosts_${accountname}`,
        JSON.stringify(likedPosts)
      );
    }
  }, [likedPosts, accountname]); // likedPosts와 accountname이 의존성 배열에 포함

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => fetchUserPostsByAccount(accountname!),
    enabled: !!accountname, // accountname이 있을 때만 쿼리 실행
  });

  // 게시글 데이터가 로드되거나 likedPosts 상태가 변경될 때 likeCounts를 초기화합니다.
  useEffect(() => {
    if (data && data.post) {
      const initialCounts: { [postId: string]: number } = {};
      data.post.forEach((post: any) => {
        let count = post.heartCount;
        // likedPosts 상태를 기준으로 좋아요 수를 조정합니다.
        // 예를 들어, localStorage에 좋아요를 누른 것으로 되어 있는데 API의 초기 좋아요 수가 0이라면 1로 조정합니다.
        if (likedPosts[post.id]) {
          // 사용자가 이전에 좋아요를 눌렀다면
          // API에서 받은 카운트가 0이더라도 1로 표시하거나, 최소한 1이 되도록 합니다.
          // 실제 서버와 동기화하려면 서버에 좋아요 API를 호출해야 하지만,
          // 새로고침 시 클라이언트 상태 유지를 위해서는 이렇게 조정합니다.
          if (count === 0) {
            // 만약 API가 0으로 보냈는데 내가 눌렀다면 1로
            count = 1;
          }
        }
        initialCounts[post.id] = count;
      });
      setLikeCounts(initialCounts);
    }
  }, [data, likedPosts]); // data와 likedPosts가 변경될 때마다 다시 계산

  const handleLikeClick = (postId: string) => {
    setLikedPosts((prevLikedPosts) => {
      const isLiked = prevLikedPosts[postId];
      const updatedLikedPosts = {
        ...prevLikedPosts,
        [postId]: !isLiked, // 좋아요 상태를 토글
      };

      // likeCounts도 함께 업데이트
      setLikeCounts((prevLikeCounts) => ({
        ...prevLikeCounts,
        [postId]: (prevLikeCounts[postId] || 0) + (isLiked ? -1 : 1), // 좋아요 여부에 따라 카운트 증감
      }));

      return updatedLikedPosts;
    });
  };

  // accountname이 유효하지 않을 때의 처리
  if (!accountname) {
    return (
      <div className="text-center text-gray-500 py-10">
        계정 정보가 유효하지 않습니다.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[333px]">
        {' '}
        {/* `h=[333px]` 대신 `h-[333px]`로 수정했습니다. */}
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[333px]">
        <ErrorFallback />
      </div>
    );
  }

  if (!data || data.post.length === 0)
    return (
      <div className="text-center text-gray-400 py-10">게시글이 없습니다.</div>
    );

  return (
    <>
      {data.post.map((post) => (
        <article className="max-w-[608px] mb-8" key={post.id}>
          {/* 프로필 헤더 영역 */}
          <div className="flex justify-between items-center">
            <div className="flex items-start gap-[12px]">
              <img
                src={getProfileImage(post.author.image)}
                alt="프로필이미지"
                className="start-0 w-10 h-10 rounded-full bg-transparent"
              />
              <div>
                <p className="text-[14px] font-bold pt-[4px] pb-[2px] ">
                  {post.author.username}
                </p>
                <p className="text-[12px] text-gray w-[107px] h-[14px]">
                  @{post.author.accountname}
                </p>
              </div>
            </div>
            <button>
              <img src={moreBtn} alt="더보기 버튼" />
            </button>
          </div>

          <div className="pl-[54px]">
            {/* 본문 영역 */}
            <p className="text-[14px] pt-[16px]">{post.content}</p>

            {/* 이미지 영역 */}
            {post.image && (
              <div className="mt-[16px] mb-[12px] aspect-[304/228] rounded-[10px]">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-full block rounded-[10px]"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* 좋아요, 댓글 영역 */}
            <ul className="flex items-center gap-[16px]">
              <li className="flex items-center gap-[6px]">
                <button onClick={() => handleLikeClick(post.id)}>
                  {/* likedPosts 상태에 따라 하트 아이콘 변경 */}
                  <img
                    src={likedPosts[post.id] ? heartFill : heart}
                    alt="좋아요"
                  />
                </button>
                <span className="text-[12px] text-gray">
                  {/* likeCounts 상태에 저장된 값을 표시, 없으면 API의 heartCount 사용 (초기 로딩 시) */}
                  {likeCounts[post.id] !== undefined
                    ? likeCounts[post.id]
                    : post.heartCount}
                </span>
              </li>
              <li className="flex items-center gap-[6px]">
                <button>
                  <img src={messageCircleBtn} alt="메세지" />
                </button>
                <span className="text-[12px] text-gray">
                  {post.commentCount}
                </span>
              </li>
            </ul>

            <p className="text-[10px] text-gray mt-[16px]">
              {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </article>
      ))}
    </>
  );
}

export default Feed;
