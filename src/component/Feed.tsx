import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import heart from '../assets/heart.svg';
import heartFill from '../assets/heart-fill.svg';
import messageCircleBtn from '../assets/message-circle.svg';
import profileImage from '../assets/profile-img.svg';
import moreBtn from '../assets/s-icon-more-vertical.svg';
import { fetchUserPostsByAccount } from '../api/getpostApi';

interface FeedProps {
  accountname: string;
}

function Feed({ accountname }: FeedProps) {
  // 좋아요 색상 변경
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => fetchUserPostsByAccount(accountname),
    enabled: !!accountname,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error instanceof Error) return <div>에러: {error.message}</div>;
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
                src={post.author.image || profileImage}
                alt="프로필이미지"
                className="start-0 w-10 h-10 rounded-full"
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
                />
              </div>
            )}

            {/* 좋아요, 댓글 영역 */}
            <ul className="flex items-center gap-[16px]">
              <li className="flex items-center gap-[6px]">
                <button onClick={handleLikeClick}>
                  <img src={isLiked ? heartFill : heart} alt="좋아요" />
                </button>
                <span className="text-[12px] text-gray">{post.heartCount}</span>
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
