import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserPostsByAccount } from '../../../api/postApi';
import iconLayers from '../../../assets/iccon-img-layers.png';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';

interface ImageGridProps {
  accountname: string;
}

function ImageGrid({ accountname }: ImageGridProps): React.ReactElement {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => fetchUserPostsByAccount(accountname),
    enabled: !!accountname,
  });

  // accountname이 유효하지 않을 때의 처리 (Feeds.tsx에서 이미 처리되었지만, 여기도 안전하게 추가)
  if (!accountname) {
    return <div className="text-center text-gray-500 py-10">계정 정보가 유효하지 않습니다.</div>;
  }

  if (isLoading) return <Loading />;
  if (isError) return <ErrorFallback />;
  if (!data || data.post.length === 0)
    return <div className="text-center text-gray-400 py-10">게시글이 없습니다.</div>;

  // 이미지가 있는 게시글만 필터링
  const postsWithImages = data.post.filter((post) => post.image);

  // 이미지가 하나도 없을 경우 메시지 표시
  if (postsWithImages.length === 0) {
    return <div className="text-center text-gray-400 py-10">표시할 이미지가 없습니다.</div>;
  }

  return (
    <ul className="grid grid-cols-3 gap-[8px] pt-5">
      {postsWithImages.map((post, index) => (
        <li
          key={post.id}
          className="w-full h-full bg-gray-200 overflow-hidden relative group aspect-square"
          aria-label={`Grid Image ${index + 1}`}
        >
          <img
            src={post.image}
            alt={`게시글 이미지 ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            crossOrigin="anonymous"
          />
          {/* 여러 이미지 지원이 필요하면 아래 조건을 수정 */}
          {/* 예시: 이미지가 여러 개인 경우 표시 */}
          {/* 현재는 post.image가 단일 이미지 URL일 수도 있고, 쉼표로 구분된 URL 문자열일 수도 있음 */}
          {post.image && post.image.includes(',') && ( // post.image가 있고, 쉼표를 포함하는지 확인
            <div className="absolute top-0.5 right-0.5 rounded-md p-1 flex items-center justify-center">
              <img
                src={iconLayers}
                alt="Show multiple images"
                className="w-6 h-6"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ImageGrid;