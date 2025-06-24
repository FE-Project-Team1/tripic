import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ProfileImage from '../../../component/ProfileImage';
import CommonInput from '../../../component/Input/CommonInput';
import AccountNameInput from '../../../component/Input/AccountNameInput';
import CommonBtn from '../../../component/CommonBtn';
import { validAccountName } from '../../../api/signupApi';
import type { IProfile } from '../Index';

interface IProfileSetting {
  onComplete: (data: IProfile) => void;
}

function ProfileSetting({ onComplete }: IProfileSetting) {
  // 계정명 검증 상태
  const [accountNameError, setAccountNameError] = useState('');
  const [accountNameSuccess, setAccountNameSuccess] = useState('');
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProfile>({
    mode: 'onBlur',
  });

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
  const onSubmit = (data: IProfile) => {
    console.log('프로필 설정 데이터:', data);
    if (onComplete) {
      onComplete(data);
    }
  };

  // 폼이 유효한지 여부 (모든 필수 필드가 채워졌고 계정명이 유효한지)
  const isFormValid =
    isValid && isAccountNameValid && !accountNameMutation.isPending;

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-3">프로필 설정</h1>
      <p className="text-center text-gray text-sm mb-[30px]">
        나중에 언제든지 변경할 수 있습니다
      </p>
      <div className="flex justify-center">
        <ProfileImage upload={true} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
        <CommonInput
          name="username"
          text="사용자 이름"
          type="text"
          register={register}
        />
        <AccountNameInput
          name="accountName"
          text="계정 ID"
          type="text"
          register={register}
          required
          errorMessage={
            (errors.accountName?.message as string) || accountNameError
          }
          successMessage={accountNameSuccess}
          onValidateAccountName={handleValidateAccountName}
        />
        <CommonInput name="intro" text="소개" type="text" register={register} />
        <div className="mt-[30px]">
          <CommonBtn
            text="감귤마켓 시작하기"
            type="submit"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </section>
  );
}

export default ProfileSetting;
