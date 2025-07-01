import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserPostsByAccount } from '../../../api/getpostApi';
import iconLayers from '../../../assets/iccon-img-layers.png';

interface ImageGridProps {
  accountname: string;
}

function ImageGrid({ accountname }: ImageGridProps): React.ReactElement {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => fetchUserPostsByAccount(accountname),
    enabled: !!accountname,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error instanceof Error) return <div>에러: {error.message}</div>;
  if (!data || data.post.length === 0)
    return <div className="text-center text-gray-400 py-10">게시글이 없습니다.</div>;

  // 이미지가 있는 게시글만 필터링
  const postsWithImages = data.post.filter((post) => post.image);

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
          />
          {/* 여러 이미지 지원이 필요하면 아래 조건을 수정 */}
          {/* 예시: 이미지가 여러 개인 경우 표시 */}
          {post.image.includes(',') && (
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
