import { useQuery } from '@tanstack/react-query';
import { getPostFeed } from '../../api/post/getPostFeed';
import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import DefaultHome from './component/DefaultHome';

function Home() {
  const { data } = useQuery({
    queryKey: ['postFeed'],
    queryFn: () => getPostFeed(10, 0), // 테스트용 10개만
    enabled: true, // 자동 실행
    staleTime: 0, // 캐시 사용 안함 (테스트용)
    retry: 1,
  });

  console.log(data, data?.posts?.length);

  return (
    <>
      <TopNavigation heading="Tripic" searchIcon={true} />
      {data?.posts && data?.posts.length > 0 ? <>test</> : <DefaultHome />}
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Home;
