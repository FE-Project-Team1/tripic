import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ProfileImage from '../../../component/ProfileImage';
import CommonInput from '../../../component/Input/CommonInput';
import AccountNameInput from '../../../component/Input/AccountNameInput';
import CommonBtn from '../../../component/CommonBtn';
import { validAccountName } from '../../../api/signupApi';
import { uploadImage, getImageUrl } from '../../../api/imageApi';
import type { IProfile } from '../Index';

interface IProfileSetting {
  onComplete: (data: IProfile) => void;
}

function ProfileSetting({ onComplete }: IProfileSetting) {
  // 계정명 검증 상태
  const [accountNameError, setAccountNameError] = useState('');
  const [accountNameSuccess, setAccountNameSuccess] = useState('');
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);

  // 이미지 파일 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IProfile>({
    mode: 'onBlur',
  });

  const username = watch('username');
  const intro = watch('intro');

  // 계정명 API 검증
  const accountNameMutation = useMutation({
    mutationFn: validAccountName,
    onSuccess: (data) => {
      setAccountNameError('');
      setAccountNameSuccess(data.message);
      setIsAccountNameValid(true);
    },
    onError: (error) => {
      if (error instanceof Error) {
        setAccountNameError(error.message);
      } else {
        setAccountNameError('계정 ID 검증에 실패했습니다.');
      }
      setAccountNameSuccess('');
      setIsAccountNameValid(false);
    },
  });

  // 이미지 업로드 뮤테이션
  const imageUploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log('이미지 업로드 성공:', data);
      setIsUploading(false);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      setIsUploading(false);
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  // 이미지 파일 선택 핸들러
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
  };

  // 계정명 검증 핸들러
  const handleValidateAccountName = (accountName: string) => {
    // 검증 전 상태 초기화
    setAccountNameError('');
    setAccountNameSuccess('');
    setIsAccountNameValid(false);

    // API 검증 실행
    accountNameMutation.mutate(accountName);
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: Omit<IProfile, 'image'>) => {
    let imageUrl = '';

    // 선택된 이미지가 있다면 업로드
    if (selectedImage) {
      try {
        console.log('selctedImage', selectedImage);
        setIsUploading(true);
        const result = await imageUploadMutation.mutateAsync(selectedImage);
        console.log('result', result);
        imageUrl = getImageUrl(result.info.filename);
      } catch (error) {
        console.error('이미지 업로드 중 오류:', error);
        return; // 에러 발생 시 회원가입 중단
      }
    }

    // 완성된 프로필 데이터 생성
    const profileData: IProfile = {
      ...data,
      image: imageUrl || '',
    };

    console.log('프로필 설정 데이터:', profileData);

    // 부모 컴포넌트로 데이터 전달 (회원가입 진행)
    if (onComplete) {
      onComplete(profileData);
    }
  };

  // 폼이 유효한지 여부
  const isFormValid =
    username &&
    intro &&
    isAccountNameValid &&
    !accountNameMutation.isPending &&
    !isUploading;

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-3">프로필 설정</h1>
      <p className="text-center text-gray text-sm mb-[30px]">
        나중에 언제든지 변경할 수 있습니다
      </p>
      <div className="flex justify-center">
        <ProfileImage upload={true} onImageSelected={handleImageSelected} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
        <CommonInput
          name="username"
          text="사용자 이름"
          type="text"
          register={register}
          required
          minLength={2}
          maxLength={10}
          errorMessage={errors.username?.message}
        />
        <AccountNameInput
          name="accountName"
          text="계정 ID"
          type="text"
          register={register}
          required
          errorMessage={errors.accountName?.message || accountNameError}
          successMessage={accountNameSuccess}
          onValidateAccountName={handleValidateAccountName}
        />
        <CommonInput
          name="intro"
          text="소개"
          type="text"
          register={register}
          required
          errorMessage={errors.intro?.message}
        />
        <div className="mt-[30px]">
          <CommonBtn
            text={
              accountNameMutation.isPending ? '로딩중...' : '감귤마켓 시작하기'
            }
            type="submit"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </section>
  );
}

export default ProfileSetting;
