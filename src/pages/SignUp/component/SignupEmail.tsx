import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import EmailInput from '../../../component/EmailInput';
import PasswordInput from '../../../component/PasswordInput';
import CommonBtn from '../../../component/CommonBtn';
import { validEmail } from '../../../api/signupApi';
import type { SignUpStep } from '../Index';

// 폼 필드 타입 정의
interface SignUpFormValues {
  email: string;
  password: string;
}

interface SignUpEmailProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>;
}

function SignUpEmail({ setCurrentStep }: SignUpEmailProps) {
  // 이메일 API 검증 결과를 저장할 상태
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // React Hook Form 설정 - blur 이벤트에 검증 실행
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>({
    mode: 'onBlur', // 포커스 해제 시 검증 실행
  });

  const password = watch('password');
  const isPasswordValid = password && password.length >= 6;

  // 이메일 유효성 검사 API 뮤테이션
  const emailValidMutation = useMutation({
    mutationFn: validEmail,
    onSuccess: (data) => {
      // API 검증 성공
      setEmailError('');
      setEmailSuccess(data.message);
      setIsEmailValid(true);
    },
    onError: (error) => {
      // API 검증 실패
      if (error instanceof Error) {
        setEmailError(error.message);
      } else {
        setEmailError('이메일 검증에 실패했습니다.');
      }
      setEmailSuccess('');
      setIsEmailValid(false);
    },
  });

  // 이메일 검증 핸들러 - blur 이벤트에서 호출됨
  const handleValidateEmail = (email: string) => {
    // 기존 메시지 초기화
    setEmailError('');
    setEmailSuccess('');

    // API 검증 실행
    emailValidMutation.mutate(email);
  };

  // 폼 제출 처리
  const onSubmit = () => {
    // 다음 단계로 이동 및 데이터 전달
    if (isEmailValid && isPasswordValid) {
      setCurrentStep('profile');
    }
  };

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-10">
        이메일로 회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          name="email"
          text="이메일"
          type="text"
          required
          register={register}
          errorMessage={(errors.email?.message as string) || emailError}
          successMessage={emailSuccess}
          onValidateEmail={handleValidateEmail}
        />
        <PasswordInput
          name="password"
          text="비밀번호"
          type="password"
          required
          register={register}
          errorMessage={errors.password?.message as string}
        />
        <div className="mt-8">
          <CommonBtn
            text={emailValidMutation.isPending ? '진행중...' : '다음'}
            type="submit"
            disabled={
              !isEmailValid || !isPasswordValid || emailValidMutation.isPending
            }
          />
        </div>
      </form>
    </section>
  );
}

export default SignUpEmail;
