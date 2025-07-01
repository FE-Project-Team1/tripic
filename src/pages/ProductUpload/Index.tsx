import TopNavigation from '../../component/Navigation/TopNavigation';
import UploadForm from './component/UploadForm';

function ProductUpload() {
  return (
    <>
      <TopNavigation backBtn={true} />
      <main className="pt-12">
        <h2 className="sr-only">상품 등록</h2>
        <UploadForm />
      </main>
    </>
  );
}

export default ProductUpload;
