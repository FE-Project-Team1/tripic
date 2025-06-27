import TopNavigation from '../../component/Navigation/TopNavigation';
import CommentInput from './component/CommentInput';
import Reply from './component/Reply';
import Feed from '../../component/Feed';

function Post() {
  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <main className='pt-[68px]'>
        <div className='px-[16px] pb-[20px]'>
          <Feed />
        </div>
        <div className='pb-[74px]'>
        <Reply />
        </div>
      </main>  
      <CommentInput />
    </>
  );
}

export default Post;
