import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../component/FormInput';
import PriceInput from '../../../component/PriceInput';
import ImageUploadBtn from '../../../component/ImageUploadBtn';
import CommonBtn from '../../../component/CommonBtn';
import { uploadProduct } from '../../../api/product/productApi';
import { postImage } from '../../../api/image/postImage';
import { getImageUrl } from '../../../api/image/getImageUrl';
import CountrySelector, {
  countryNames,
} from '../../../component/CountrySelector';

interface IProductForm {
  itemName: string;
  price: number;
}

function UplaodForm() {
  const navigate = useNavigate();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(''); // 선택된 국가 코드
  const [selectedCountryName, setSelectedCountryName] = useState<string>(''); // 선택된 국가 이름

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IProductForm>({
    mode: 'onChange', // 실시간 유효성 검증
  });

  // 폼 필드 값들을 실시간으로 감시
  const itemName = watch('itemName');
  const price = watch('price');

  // 유효성 검증: 모든 필드가 입력되고 이미지가 선택되었는지 확인
  const isFormValid =
    itemName &&
    price &&
    selectedCountryName &&
    selectedImageFile &&
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

  // 폼 제출 핸들러
  const onSubmit = async (data: IProductForm) => {
    if (!selectedImageFile) {
      alert('이미지를 등록해주세요.');
      return;
    }

    try {
      setIsUploading(true);

      console.log('=== 업로드 시작 ===');
      console.log('이미지 파일:', selectedImageFile);
      console.log('상품 데이터:', data);

      // 1단계: 이미지 업로드
      console.log('1단계: 이미지 업로드 시작...');
      const imageUploadResponse = await postImage(selectedImageFile);
      const imageUrl = getImageUrl(imageUploadResponse.info.filename);

      console.log('이미지 업로드 성공:', imageUrl);

      // 2단계: 상품 업로드
      console.log('2단계: 상품 업로드 시작...');
      const productData = {
        itemName: data.itemName,
        price: Number(data.price),
        link: selectedCountryName,
        itemImage: imageUrl, // 업로드된 이미지 URL 사용
      };

      const productUploadResponse = await uploadProduct(productData);

      console.log('상품 업로드 성공:', productUploadResponse);
      console.log('=== 모든 업로드 완료 ===');

      // 두 API 모두 성공 시 알림 및 페이지 이동
      alert('업로드 되었습니다');
      navigate('/my-profile');
    } catch (error) {
      console.error('업로드 실패:', error);

      // 두 API 중 하나라도 실패 시 에러 메시지 표시
      const errorMessage =
        error instanceof Error ? error.message : '업로드에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

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
              text={isUploading ? '업로드중...' : '저장'}
              type="submit"
              disabled={!isFormValid || isUploading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default UplaodForm;
