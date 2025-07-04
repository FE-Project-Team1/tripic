import ProfileImage from '../../../component/ProfileImage';
import CommonBtn from '../../../component/CommonBtn';
import FormInput from '../../../component/FormInput';
import { useProfileForm } from '../../../hooks/useProfileForm';
import type { IProfile } from '../../../types/commonType';

interface IProfileSetting {
  onComplete: (data: IProfile) => void;
}

function ProfileSetting({ onComplete }: IProfileSetting) {
  const {
    register,
    handleSubmit,
    errors,
    accountNameError,
    accountNameSuccess,
    handleImageSelected,
    handleValidateAccountName,
    uploadImageIfSelected,
    isFormValid,
    isLoading,
  } = useProfileForm({
    enableImageUpload: true,
    enableAccountValidation: true,
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: Omit<IProfile, 'image'>) => {
    try {
      const imageUrl = await uploadImageIfSelected();

      const profileData: IProfile = {
        ...data,
        image: imageUrl,
      };

      console.log('프로필 설정 데이터:', profileData);
      onComplete(profileData);
    } catch (error) {
      console.error('프로필 설정 중 오류:', error);
    }
  };

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
        <FormInput
          name="username"
          text="사용자 이름"
          register={register}
          required
          minLength={2}
          maxLength={10}
          errorMessage={errors.username?.message}
          placeholder="2~10자 이내여야 합니다."
        />
        <FormInput
          name="accountName"
          text="계정 ID"
          variant="accountName"
          register={register}
          required
          errorMessage={errors.accountName?.message || accountNameError}
          successMessage={accountNameSuccess}
          onValidateAccountName={handleValidateAccountName}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
        />
        <FormInput
          name="intro"
          text="소개"
          register={register}
          required
          errorMessage={errors.intro?.message}
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
        />
        <div className="mt-[30px]">
          <CommonBtn
            text={isLoading ? '로딩중...' : '감귤마켓 시작하기'}
            type="submit"
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </section>
  );
}

export default ProfileSetting;
