import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../../../api/product/getProductDetail';
import { getImageUrl } from '../../../api/image/getImageUrl';
import FormInput from '../../../component/FormInput';
import PriceInput from '../../../component/PriceInput';
import ImageUploadBtn from '../../../component/ImageUploadBtn';
import CommonBtn from '../../../component/CommonBtn';
import CountrySelector, {
  countryNames,
} from '../../../component/CountrySelector';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import { putProduct } from '../../../api/product/putProduct';
import { postImage } from '../../../api/image/postImage';

interface IProductForm {
  itemName: string;
  price: number;
}

function UploadForm() {
  // URL에서 product-id 추출
  const { 'product-id': productId } = useParams<{ 'product-id': string }>();
  const navigate = useNavigate();

  // React Query로 상품 상세 정보 가져오기
  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId!),
    enabled: !!productId,
  });

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IProductForm>({
    mode: 'onChange',
  });

  // 폼 필드 값들을 실시간으로 감시
  const itemName = watch('itemName');
  const price = watch('price');

  // 상품 데이터로 폼 초기화
  useEffect(() => {
    if (productDetail?.product && !isDataLoaded) {
      const { product } = productDetail;

      // 폼 필드 값 설정
      setValue('itemName', product.itemName);
      setValue('price', product.price);

      // 이미지 미리보기 설정
      if (product.itemImage) {
        const fullImageUrl = getImageUrl(product.itemImage);
        setPreviewImageUrl(fullImageUrl);
      }

      // 장소(link) 설정 - countryNames에서 매칭되는 항목 찾기
      if (product.link) {
        const matchedCountryEntry = Object.entries(countryNames).find(
          ([code, name]) => name === product.link || code === product.link
        );

        if (matchedCountryEntry) {
          const [countryCode, countryName] = matchedCountryEntry;
          setSelectedCountryCode(countryCode);
          setSelectedCountryName(countryName);
        } else {
          // 매칭되지 않으면 link 값을 그대로 사용
          setSelectedCountryName(product.link);
        }
      }

      setIsDataLoaded(true);
    }
  }, [productDetail, setValue, isDataLoaded]);

  // 유효성 검증: 모든 필드가 입력되고 이미지가 선택되었는지 확인
  const isFormValid =
    itemName &&
    price &&
    selectedCountryName &&
    (selectedImageFile || previewImageUrl) && // 기존 이미지 또는 새 이미지
    itemName.length >= 2 &&
    itemName.length <= 15 &&
    price >= 1;

  // 국가 선택 핸들러
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountryName(countryName);

    const countryCode = Object.keys(countryNames).find(
      (name) => countryNames[name] === countryName
    );

    if (countryCode) {
      setSelectedCountryCode(countryCode);
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 파일 저장 (실제 업로드는 폼 제출시)
      setSelectedImageFile(file);

      // 미리보기용 로컬 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setPreviewImageUrl(previewUrl);
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      alert('이미지 선택에 실패했습니다.');
    }
  };

  // 폼 제출 핸들러 - ProductUpload 패턴 적용
  const onSubmit = async (data: IProductForm) => {
    // 기존 이미지가 있고 새 이미지가 없으면 통과
    if (!selectedImageFile && !previewImageUrl) {
      alert('이미지를 등록해주세요.');
      return;
    }

    try {
      setIsUploading(true);

      console.log('=== 상품 수정 시작 ===');
      console.log('상품 ID:', productId);
      console.log('폼 데이터:', data);
      console.log('선택된 국가:', selectedCountryName);

      let finalImageUrl = '';

      // 새로운 이미지가 선택된 경우에만 업로드
      if (selectedImageFile) {
        // 1단계: 이미지 업로드 (ProductUpload와 동일한 패턴)
        console.log('1단계: 새 이미지 업로드 시작...');
        const imageUploadResponse = await postImage(selectedImageFile);
        finalImageUrl = getImageUrl(imageUploadResponse.info.filename);
        console.log('이미지 업로드 성공:', finalImageUrl);
      } else {
        // 기존 이미지 사용
        console.log('기존 이미지 사용:', previewImageUrl);
        finalImageUrl = previewImageUrl;
      }

      // 2단계: 상품 수정 (ProductUpload의 uploadProduct와 유사한 패턴)
      console.log('2단계: 상품 수정 시작...');
      const updateData = {
        itemName: data.itemName,
        price: Number(data.price), // ProductUpload와 동일하게 Number로 변환
        link: selectedCountryName,
        itemImage: finalImageUrl,
      };

      console.log('상품 수정 데이터:', updateData);

      const updatedProduct = await putProduct(productId!, updateData);

      console.log('상품 수정 성공:', updatedProduct);
      console.log('=== 모든 수정 완료 ===');

      // 두 단계 모두 성공 시 알림 및 페이지 이동 (ProductUpload와 동일한 패턴)
      alert('수정되었습니다');
      navigate('/my-profile');
    } catch (error) {
      console.error('수정 실패:', error);

      // ProductUpload와 동일한 에러 처리 패턴
      const errorMessage =
        error instanceof Error ? error.message : '수정에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="h-[400px]">
        <Loading />
      </div>
    );
  }

  // 에러 상태
  if (isError || !productDetail?.product) {
    return (
      <div className="h-[400px]">
        <ErrorFallback />
      </div>
    );
  }

  return (
    <form
      className="pt-[30px] px-[34px] max-w-[640px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h3 className="text-[12px] text-gray mb-[18px]">이미지 등록</h3>
        <div className="aspect-[322/204] bg-light-gray rounded-[10px] border-light-gray border-[1px] relative">
          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="상품 미리보기"
              className="w-full h-full object-cover block rounded-[10px]"
              crossOrigin="anonymous"
            />
          )}
          <ImageUploadBtn
            position="bottom-right-3"
            handleImageChange={handleImageChange}
          />
        </div>
        <div className="mt-[30px]">
          <FormInput
            name="itemName"
            text="상품명"
            register={register}
            required
            minLength={2}
            maxLength={15}
            errorMessage={errors.itemName?.message}
            placeholder="2~15자 이내여야 합니다."
          />
          <PriceInput
            name="price"
            text="가격"
            value={price}
            setValue={setValue}
            errorMessage={errors.price?.message}
            placeholder="숫자만 입력 가능합니다."
          />
          <CountrySelector
            onCountrySelect={handleCountrySelect}
            selectedCountry={selectedCountryCode}
          />
          <div className="mt-[30px]">
            <CommonBtn
              text={isUploading ? '저장중...' : '저장'}
              type="submit"
              disabled={!isFormValid || isUploading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default UploadForm;
