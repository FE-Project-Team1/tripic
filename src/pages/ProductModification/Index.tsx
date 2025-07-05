import TopNavigation from '../../component/Navigation/TopNavigation';
import UploadForm from './component/UploadForm';

function ProductModification() {
  return (
    <>
      <TopNavigation backBtn={true} />
      <main className="pt-12">
        <h2 className="sr-only">상품 수정</h2>
        <UploadForm />
      </main>
    </>
  );
}

export default ProductModification;
