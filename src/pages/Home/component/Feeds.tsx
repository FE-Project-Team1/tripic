import { useInfiniteQuery } from '@tanstack/react-query';
import { getCookie } from '../../../utils/auth';
import { getPostFeed } from '../../../api/post/getPostFeed';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import DefaultHome from './DefaultHome';
import Feed from '../../../component/Feed/Feed';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

function Feeds() {
  const token = getCookie('token');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['postFeed'],
    queryFn: ({ pageParam = 0 }) => getPostFeed(20, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.posts.length === 20 ? allPages.length * 20 : undefined;
    },
    initialPageParam: 0,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const { targetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen">
        <ErrorFallback />
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (posts.length === 0) return <DefaultHome />;

  return (
    <div className="pt-17 px-4 pb-15 mx-auto max-w-[608px]">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Feed post={post} />
          </li>
        ))}
      </ul>

      {/* 로딩 트리거 */}
      <div ref={targetRef} className="h-20">
        {isFetchingNextPage && <Loading />}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-gray flex justify-center items-center h-full">
            모든 게시글을 확인했습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default Feeds;
