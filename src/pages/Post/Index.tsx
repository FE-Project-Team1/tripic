import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../api/post/getPostDetail';
import TopNavigation from '../../component/Navigation/TopNavigation';
import CommentInput from '../../component/CommentInput';
import Reply from './component/Reply';
import Feed from '../../component/Feed/Feed';
import Loading from '../../component/Loading';
import ErrorFallback from '../../component/ErrorFallback';

function Post() {
  const { postId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId!),
    enabled: !!postId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  if (isLoading) {
    <div className="h-screen">
      <Loading />
    </div>;
  }

  if (isError) {
    <div className="h-screen">
      <ErrorFallback />
    </div>;
  }

  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <main className="pt-[68px]">
        <div className="px-[16px] pb-[20px]">
          {data?.post && <Feed post={data.post} />}
        </div>
        <div className="pb-[74px]">
          <Reply />
        </div>
      </main>
      <CommentInput />
    </>
  );
}

export default Post;
