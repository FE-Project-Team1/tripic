import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../../component/ProfileImage';
import FormInput from '../../../component/FormInput';
import CommonBtn from '../../../component/CommonBtn';
import { useProfileForm } from '../../../hooks/useProfileForm';
import { modifyProfile } from '../../../api/profileApi';
import type { IProfile } from '../../../types/commonType';
import { setCookie } from '../../../utils/auth';

function ProfileInput() {
  const navigate = useNavigate();

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
      // 이미지 업로드 처리
      const imageUrl = await uploadImageIfSelected();

      // 프로필 데이터 구성
      const profileData = {
        username: data.username,
        accountname: data.accountName,
        intro: data.intro,
        image: imageUrl,
      };

      console.log('프로필 수정 데이터:', profileData);

      // modifyProfile API 호출
      const result = await modifyProfile(profileData);

      console.log('프로필 수정 성공:', result);

      // 성공 시 알림 및 페이지 이동
      alert('프로필 수정이 완료되었습니다');
      navigate('/profile');
      setCookie('accountname', data.accountName, 1);
    } catch (error) {
      console.error('프로필 수정 중 오류:', error);

      // 실패 시 에러 메시지 표시
      const errorMessage =
        error instanceof Error ? error.message : '프로필 수정에 실패했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <main className="pt-[78px]">
      <h2 className="sr-only">프로필 수정</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <ProfileImage upload={true} onImageSelected={handleImageSelected} />
        </div>
        <div className="mt-[30px] px-[34px]">
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
              text={isLoading ? '저장중...' : '저장'}
              type="submit"
              disabled={!isFormValid || isLoading}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default ProfileInput;
