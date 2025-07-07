import { useQuery } from '@tanstack/react-query';
import { getCookie } from '../../../utils/auth';
import { getPostFeed } from '../../../api/post/getPostFeed';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import DefaultHome from './DefaultHome';
import Feed from '../../../component/Feed/Feed';

function Feeds() {
  const token = getCookie('token');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['postFeed'],
    queryFn: () => getPostFeed(10, 0),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: 1,
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

  return (
    <>
      {data?.posts && data?.posts.length > 0 ? (
        <ul className="pt-17 px-4 pb-15">
          {data.posts.map((post) => (
            <li key={post.id}>
              <Feed post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <DefaultHome />
      )}
    </>
  );
}

export default Feeds;
