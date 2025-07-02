import TopNavigation from '../../component/Navigation/TopNavigation';
import UploadForm from './component/UploadForm';

function PostUpload() {
  return (
    <>
      <TopNavigation backBtn={true} />
      <UploadForm />
    </>
  );
}

export default PostUpload;
